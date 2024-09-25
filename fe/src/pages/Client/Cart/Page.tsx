import useCart from "@/common/hooks/Cart/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputNumber, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { mutatioinCart } from "@/common/hooks/Cart/mutationCart";

const Page = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data, isLoading } = useCart(userId);
    const { mutate: updateStatus } = mutatioinCart('UPDATE_STATUS');
    // const { mutate } = mutatioinCart('DELETE');
    const navi = useNavigate();
    const dataSource = data?.cart?.flatMap((cart: any) =>
        cart.products.map((product: any) => ({
            key: product._id,
            ...product,
            productId: product.productId,
            totalPriceItem: product.total_price_item,
            quantity: product.quantity,
            status_checked: product.status_checked,
            cartId: cart._id,
        }))
    );

    const handleSelectProduct = (product: any, checked: boolean) => {
        const updatedProduct = {
            userId,
            cartId: product.cartId,
            productId: product.productId,
            color: product.color,
            size: product.size,
            status_checked: checked,
        };
        updateStatus(updatedProduct);
    };

    const totalSelectedPrice = dataSource?.filter((product: any) => product.status_checked).reduce((total: any, product: any) => {
        return total + (product.quantity * product.totalPriceItem);
    }, 0) || 0;

    const handleProceedToCheckout = () => {
        const selectedForPayment = dataSource?.filter((product: any) => product.status_checked);
        if (selectedForPayment.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
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
                    checked={product.status_checked}
                    onChange={(e) => handleSelectProduct(product, e.target.checked)}
                />
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId: any) => (
                <img src={productId?.images[0]} alt={productId?.name} className="w-[100px]" />
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            render: (productId: any, product: any) => (
                <div className="flex flex-col">
                    <h1 className="font-bold">{productId?.name.length > 20 ? `${productId?.name.substring(0, 35)}...` : productId?.name}</h1>
                    <p>{product?.color} - {product?.size}</p>
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'totalPriceItem',
            key: 'totalPriceItem',
            render: (price: number) => (
                price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, product: any) => (
                <div className="flex items-center">
                    <Button>-</Button>
                    <InputNumber min={1} defaultValue={product.quantity} style={{ margin: '0 10px', width: '60px' }} />
                    <Button>+</Button>
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
            render: (_: any,) => (
                <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                    onConfirm={() => console.log('delete')}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                </Popconfirm>
            ),
        },
    ];

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <div className="dhn-container">
                <h1 className="text-3xl">Giỏ hàng</h1>
                <div className="flex gap-6 mt-7">
                    <div className="basis-4/6">
                        <Table columns={columns} dataSource={dataSource} pagination={false} />
                    </div>
                    <div className="border basis-2/6 p-[20px] h-[362px] rounded-md shadow-md">
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

                        <button onClick={handleProceedToCheckout} className="bg-black text-white w-full h-[55px] my-3 rounded">Tiến hành thanh toán</button>

                    </div>
                </div>
            </div>
            <div className="mb-20" />
        </>
    );
};

export default Page;
