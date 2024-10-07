import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Table, Modal, Select, Input } from "antd";
import { useState } from "react";
import List_order_counter from "./_component/List_order_counter";
import Add_adderss from "@/components/address/Add_adderss";

const { Option } = Select;
const Page = () => {
    const [orders, setOrders] = useState<any>([]);
    console.log(orders);

    const [orderCount, setOrderCount] = useState(1);
    const [isOpened, setIsOpened] = useState(false);
    const [isAddressOpened, setIsAddressOpened] = useState(false);
    const [isOrderCreated, setIsOrderCreated] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    console.log(selectedOrder);

    const [address, setAddress] = useState<any>({});
    const createOrder = () => {
        if (orders.length >= 10) {
            message.warning("Bạn không thể tạo thêm đơn hàng, tối đa là 10 đơn.");
            return;
        }
        const newOrder = {
            id: orderCount,
            name: `Đơn hàng ${orderCount}`,
            items: []
        };

        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        setOrderCount(orderCount + 1);
        setIsOrderCreated(true);
        setSelectedOrder(newOrder);
    };

    const removeOrder = (orderId: any) => {
        const updatedOrders = orders.filter((o: any) => o.id !== orderId);
        setOrders(updatedOrders);
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(null);
        }
        if (updatedOrders.length === 0) {
            setIsOrderCreated(false);
        }
    };

    const handleAddProduct = (product: any) => {
        if (!selectedOrder) return;
        const updatedOrder = {
            ...selectedOrder,
            items: [
                ...selectedOrder.items,
                {
                    product_name: product.name,
                    quantity: 1,
                    total_price_item: product?.attributes?.flatMap((attr: any) =>
                        attr?.sizes?.map((size: any) => {
                            if (product.selected.color === attr.color && product.selected.size === size.size) {
                                return size.price;
                            }
                            return null;
                        })
                    ).filter((price: any) => price !== null),

                    product_image: product.images[0],
                    selected_color: product.selected.color,
                    selected_size: product.selected.size
                }
            ]
        };

        const updatedOrders = orders.map((order: any) => {
            if (order.id === selectedOrder.id) {
                return updatedOrder;
            }
            return order;
        });

        setOrders(updatedOrders);
        setSelectedOrder(updatedOrder);
        setIsOpened(false);
    };


    const handleOpen = () => {
        setIsOpened(true);
    };

    const handleClose = () => {
        setIsOpened(false);
    };
    const handleIsAddressOpened = () => {
        setIsAddressOpened(!isAddressOpened);
    }
    const columns: any = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, order: any) => {
                return (
                    <img src={order.product_image} alt="" width={100} />
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
                        <p>{order.product_name?.length > 50 ? `${order.product_name.substring(0, 50)}...` : order.product_name}</p>
                        <span>{order.selected_color} - {order.selected_size}</span>

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
                    <p>{(order?.total_price_item)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                );
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (_: any, order: any) => {
                const totalPrice = (order.total_price_item * order.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
            <div className="flex justify-between mb-5">
                <h1 className="text-lg font-bold">Bán hàng</h1>
                <Button onClick={createOrder}>Tạo đơn hàng</Button>
            </div>
            {isOrderCreated && (
                <div>
                    <ul className="flex items-center gap-6 border-b">
                        {orders.map((order: any) => (
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
                            <Table columns={columns} dataSource={selectedOrder?.items || []} pagination={false} />
                        </div>
                        {selectedOrder && (
                            <div className="mt-5">
                                <div className="flex justify-between my-4">
                                    <div className="flex gap-10">
                                        <div>
                                            <p>Tên người mua: {address.name}</p>
                                            <p className="py-1">Số điện thoại: {address.phone}</p>
                                            <p>Địa chỉ: {address.address_detail} - {address.address}</p>
                                            <Button type="primary" className="my-4" onClick={handleIsAddressOpened}>Thêm địa chỉ</Button>
                                        </div>

                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-lg font-bold">Tổng tiền:
                                            {/* <span className="text-red-500"> {(selectedOrder?.total_price_item).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> */}
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
                                            <span className="text-gray-500"> (Chưa tính)</span>
                                        </p>
                                        <p className="text-lg font-bold">Thành tiền:
                                            {/* <span className="text-green-500"> {(selectedOrder.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> */}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )}
                        <Button type="primary" className="mt-5">Đặt hàng</Button>
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
                <List_order_counter onSelectProduct={handleAddProduct} />
            </Modal>
            {isAddressOpened &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className=" p-6 w-11/12 md:w-1/3">
                        <Add_adderss handleOpned={handleIsAddressOpened} setAddress={setAddress} />
                    </div>
                </div>

            }
        </>
    );
};

export default Page;
