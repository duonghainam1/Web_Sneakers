/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Table, Modal, Select, Input } from "antd";
import { useState } from "react";
import List_order_counter from "./_component/List_order_counter";
import Address_form from "./_component/Address_form";
import { mutation_Order } from "@/common/hooks/Order/mutation_Order";
import { useLocalStorage } from "@/common/hooks/useStorage";

const { Option } = Select;
const Page = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [orders, setOrders] = useState<any>([]);
    const [orderCount, setOrderCount] = useState(1);
    const [isOpened, setIsOpened] = useState(false);
    const [isAddressOpened, setIsAddressOpened] = useState(false);
    const [isOrderCreated, setIsOrderCreated] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const { mutate, contextHolder } = mutation_Order('ADD', 'admin || staff');

    const handle_Pay = (cart: any) => {
        const updatedOrder = {
            ...selectedOrder,
            items: cart
        };
        setSelectedOrder(updatedOrder);
        const updatedOrders = orders.map((order: any) => {
            if (order.id === updatedOrder.id) {
                return updatedOrder;
            }
            return order;
        });

        setOrders(updatedOrders);
    };
    const dataa = selectedOrder?.items.map((item: any) => ({
        key: item.productId,
        ...item
    }));
    const createOrder = () => {
        if (orders.length >= 10) {
            message.warning("Bạn không thể tạo thêm đơn hàng, tối đa là 10 đơn.");
            return;
        }
        const newOrder = {
            id: orderCount,
            name: `Đơn hàng ${orderCount}`,
            items: [],
            address: {}
        };
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        setOrderCount(orderCount + 1);
        setIsOrderCreated(true);
        setSelectedOrder(newOrder);
    };

    const removeOrder = (orderId: any) => {
        console.log(orderId);

        const updatedOrders = orders.filter((o: any) => o.id !== orderId);
        setOrders(updatedOrders);
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(null);
        }
        if (updatedOrders.length === 0) {
            setIsOrderCreated(false);
        }
    };
    const handleSubmit = () => {
        if (!selectedOrder.address.userName || !selectedOrder.address.phone || !selectedOrder.address.address || !selectedOrder.address.address_detail) {
            message.warning("Vui lòng nhập đầy đủ thông tin người mua.");
            return;
        }
        const totalAmount = dataa.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);
        const orders_Data = {
            userId: userId,
            role: 'admin || staff',
            items: selectedOrder?.items?.map((product: any) => ({
                productId: product.productId,
                product_name: product.name,
                product_image: product.images,
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                status_checked: false,
                total_price_item: totalAmount,

            })),
            customerInfo: selectedOrder.address,
            // payment: payment,
            totalPrice: totalAmount
        }
        mutate(orders_Data, {
            onSuccess: () => {
                const nextOrderIndex = orders.findIndex((order: any) => order.id === selectedOrder.id) + 1;
                const prveOrderIndex = orders.findIndex((order: any) => order.id === selectedOrder.id) - 1;

                if (nextOrderIndex < orders.length) {
                    setSelectedOrder(orders[nextOrderIndex]);
                } else {
                    setSelectedOrder(orders[prveOrderIndex]);
                }
            }
        });
        removeOrder(selectedOrder.id);
    }
    const handleOpen = () => {
        setIsOpened(true);
    };
    const handleClose = () => {
        setIsOpened(false);
    };
    const handleIsAddressOpened = () => {
        setIsAddressOpened(!isAddressOpened);
    };
    const setAddress = (address: any) => {
        const updatedOrder = {
            ...selectedOrder,
            address: address
        };
        const updatedOrders = orders.map((order: any) => {
            if (order.id === updatedOrder.id) {
                return updatedOrder;
            }
            return order;
        });
        setOrders(updatedOrders);
        setSelectedOrder(updatedOrder);
    };
    const columns: any = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, order: any) => {
                return (
                    <img src={order.images} alt="" width={100} />
                );
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (_: any, order: any) => {
                return (
                    <div>
                        <p>{order.name?.length > 50 ? `${order.name.substring(0, 50)}...` : order.name}</p>
                        <span>{order.color} - {order.size}</span>
                    </div>
                );
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, order: any) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: "8px" }}>
                        <Button type="primary" size="small">-</Button>
                        <Input
                            value={order.quantity}
                            style={{ width: '50px', textAlign: 'center' }}
                            size="small"
                            readOnly
                        />
                        <Button type="primary" size="small">+</Button>
                    </div>
                );
            }
        },
        {
            title: 'Giá',
            dataIndex: 'total_price_item',
            key: 'total_price_item',
            render: (_: any, order: any) => {
                return (
                    <p>{(order?.price)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                );
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (_: any, order: any) => {
                const totalPrice = (order.price * order.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                return <p>{totalPrice}</p>;
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, order: any) => {
                return (
                    <div className="flex justify-center">
                        <DeleteOutlined
                            style={{ cursor: 'pointer', color: 'red', fontSize: '24px' }}
                            onClick={() => removeOrder(order.id)}
                        />
                    </div>
                );
            }
        }
    ];

    return (
        <>
            {contextHolder}
            <div className="flex justify-between mb-5">
                <h1 className="text-lg font-bold">Bán hàng</h1>
                <Button onClick={createOrder}>Tạo đơn hàng</Button>
            </div>
            {isOrderCreated && (
                <div>
                    <ul className="flex items-center gap-6 border-b">
                        {orders.map((order: any) => (
                            console.log(order.id),

                            <li key={order.id} className={`p-2 ${selectedOrder === order ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}`}
                                onClick={() => setSelectedOrder(order)}>
                                {order.name}
                                <CloseCircleOutlined
                                    onClick={() => removeOrder(order.id)}
                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '8px' }}
                                />
                            </li>
                        ))}
                    </ul>

                    <div>
                        <h1 className="font-bold text-lg my-4">Thông tin đơn hàng: {selectedOrder?.name}</h1>

                        <div className="flex justify-between my-3">
                            <h1 className="font-bold text-lg">Sản phẩm</h1>
                            <Button type="primary" onClick={handleOpen}>Thêm</Button>
                        </div>
                        <div>
                            <Table columns={columns} dataSource={dataa} pagination={false} scroll={{ x: 1000 }} />
                        </div>
                        {selectedOrder && (
                            <div className="mt-5">
                                <div className="flex flex-wrap lg:flex-nowrap justify-between my-4 ">
                                    <div className="flex gap-10">
                                        <div className="text-lg">
                                            <p>Tên người mua: <strong>{selectedOrder.address.userName}</strong> </p>
                                            <p className="py-1">Số điện thoại: <strong>{selectedOrder.address.phone}</strong> </p>
                                            <p>Địa chỉ: <strong>{selectedOrder.address.address_detail} - {selectedOrder.address.address}</strong> </p>
                                            <Button type="primary" className="my-4" onClick={handleIsAddressOpened}>Thêm địa chỉ</Button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-lg font-bold">Tổng tiền:
                                            <span className="text-red-500 pl-2">
                                                {(dataa.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0))
                                                    ?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span>
                                        </p>
                                        <p className="text-lg">
                                            Mã giảm giá:
                                            <Select className="w-[200px] ml-2">
                                                <Option value="01">MÃ 001</Option>
                                                <Option value="02">MÃ 003</Option>
                                                <Option value="03">MÃ 002</Option>
                                            </Select>
                                        </p>
                                        <p className="text-lg">Phí vận chuyển:
                                            <span className="text-gray-500 pl-2">0 đ</span>
                                        </p>
                                        <p className="text-lg font-bold">Tổng tiền:
                                            <span className="text-red-500 pl-2">
                                                {(dataa.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0))
                                                    ?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center">
                            <Button type="primary" className="mt-5" onClick={handleSubmit}>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            )}
            <Modal
                title="Thêm sản phẩm"
                visible={isOpened}
                onCancel={handleClose}
                footer={null}
                width={1200}
            >
                <List_order_counter handle_pay={handle_Pay} handleClose={handleClose} />
            </Modal>
            {isAddressOpened &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className=" p-6 w-11/12 md:w-1/3">
                        <Address_form handleOpned={handleIsAddressOpened} setAddress={setAddress} />
                    </div>
                </div>
            }
        </>
    );
};

export default Page;