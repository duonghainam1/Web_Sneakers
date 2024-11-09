import { useState, useEffect } from 'react'; // Thêm useState và useEffect
import useCart from "@/common/hooks/Cart/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputNumber, message, Modal, Popconfirm, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { mutatioinCart } from "@/common/hooks/Cart/mutationCart";
import Skeleton_item from "@/components/Skeleton/Skeleton";

const Page = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data, isLoading } = useCart(userId);
    const { mutate: updateStatus } = mutatioinCart('UPDATE_STATUS');
    const { mutate: deleteProduct } = mutatioinCart('DELETE');
    const { mutate: increaseQuantity } = mutatioinCart('INCREASE');
    const { mutate: decreaseQuantity } = mutatioinCart('REDUCE');
    const navi = useNavigate();
    const [localDataSource, setLocalDataSource] = useState<any>([]);
    useEffect(() => {
        if (data?.cart) {
            const updatedData = data.cart.flatMap((cart: any) =>
                cart.products.map((product: any) => ({
                    ...product,
                    totalPriceItem: product.total_price_item,
                }))
            );
            setLocalDataSource(updatedData);
        }
    }, [data]);

    const handleSelectProduct = (product: any, checked: boolean) => {
        const updatedProduct = {
            userId,
            productId: product.productId,
            color: product.color,
            size: product.size,
            status_checked: checked,
        };
        updateStatus(updatedProduct);
    };

    const handleIncreaseQuantity = (product: any) => {
        const updatedProduct = {
            userId,
            productId: product.productId._id,
            color: product.color,
            size: product.size,
            checked: product.status_checked,
        };
        setLocalDataSource((prev: any) =>
            prev.map((item: any) =>
                item.productId._id === product.productId._id &&
                    item.color === product.color && item.size === product.size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
        increaseQuantity(updatedProduct);
    };


    const handleDecreaseQuantity = (product: any) => {
        const updatedProduct = {
            userId,
            productId: product.productId._id,
            color: product.color,
            size: product.size,
            checked: product.status_checked,
        };

        if (product.quantity <= 1) {
            Modal.confirm({
                title: "Xác nhận xóa sản phẩm",
                content: "Bạn có muốn xóa sản phẩm này không?",
                onOk: () => {
                    setLocalDataSource((prev: any) =>
                        prev.filter((item: any) => item.productId._id !== product.productId._id)
                    );
                    decreaseQuantity(updatedProduct);

                },
            });
            return;
        }
        setLocalDataSource((prev: any) =>
            prev.map((item: any) =>
                item.productId._id === product.productId._id &&
                    item.color === product.color && item.size === product.size
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
        decreaseQuantity(updatedProduct);
    };


    const totalSelectedPrice = localDataSource.filter((product: any) => product?.status_checked).reduce((total: any, product: any) => {
        return total + (product.quantity * product.totalPriceItem);
    }, 0) || 0;

    const handleDeleteProduct = (product: any) => {
        const productData = {
            userId,
            productId: product.productId,
            size: product.size,
            color: product.color,
        };
        deleteProduct(productData);
    };

    const handleProceedToCheckout = () => {
        const selectedForPayment = localDataSource.filter((product: any) => product.status_checked);
        if (selectedForPayment.length === 0) {
            message.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }
        navi(`/orders`);
    };

    const columns = [
        {
            title: (<Checkbox />),
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_: any, product: any) => (
                <Checkbox
                    checked={product?.status_checked}
                    onChange={(e) => handleSelectProduct(product, e.target.checked)}
                />
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, product: any) => (
                <img src={product?.productId?.images[0]} alt={product?.name} className="w-[100px]" />
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (_: any, product: any) => (
                <div className="flex flex-col">
                    <h1 className="font-bold">{product?.productId?.name.length > 20 ? `${product?.productId?.name.substring(0, 35)}...` : product?.productId?.name}</h1>
                    <p>{product?.color} - {product?.size}</p>
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'totalPriceItem',
            key: 'totalPriceItem',
            render: (totalPriceItem: number) => (
                totalPriceItem?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, product: any) => (
                <div className="flex items-center">
                    <Button onClick={() => handleDecreaseQuantity(product)}>-</Button>
                    <InputNumber value={product?.quantity} style={{ margin: '0 10px', width: '60px' }} readOnly />
                    <Button onClick={() => handleIncreaseQuantity(product)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (_: any, product: any) => (
                (product?.quantity * product?.totalPriceItem)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ),
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, product: any) => (
                <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                    onConfirm={() => handleDeleteProduct(product)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                </Popconfirm>
            ),
        },
    ];

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;

    return (
        <>
            <div className="lg:mx-28">
                <h1 className="text-3xl">Giỏ hàng</h1>
                {isLoading && <Skeleton_item />}
                <div className="flex flex-col lg:flex-row gap-6 mt-7">
                    <div className="basis-4/6">
                        <Table columns={columns} dataSource={localDataSource} pagination={false} />
                    </div>
                    <div className="border basis-2/6 p-[20px] h-[362px] rounded shadow mb-6">
                        <div className="flex justify-between font-bold p-[10px] border-b">
                            <p>Tổng tiền</p>
                            <p>{totalSelectedPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>

                        <div className="border-b-2 py-4">
                            <span>Nhập mã giảm giá</span>
                            <div className="flex justify-between border-2 border-black rounded h-[55px] my-2">
                                <input type="text" className="rounded outline-none px-[15px]" />
                                <button className="w-[100px] bg-black text-white">Áp dụng</button>
                            </div>
                            <div className="flex justify-between">
                                <p>Vận chuyển</p>
                                <p>$0</p>
                            </div>
                        </div>
                        <div className="flex justify-between font-bold my-4">
                            <p>Tổng cộng</p>
                            <p>{totalSelectedPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                        <Button className="w-full h-14 !bg-black border-none !text-white font-bold text-lg" onClick={handleProceedToCheckout}>Thanh toán</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
