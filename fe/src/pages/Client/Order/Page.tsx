import useCart from "@/common/hooks/Cart/useCart";
import { mutation_Order } from "@/common/hooks/Order/mutation_Order";
import { useLocalStorage } from "@/common/hooks/useStorage";
import Add_adderss from "@/components/address/Add_adderss";
import { EnvironmentOutlined, } from "@ant-design/icons";
import { Select, Table } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data } = useCart(userId);
    const [isOpend, setIsOpend] = useState(false);
    const [address, setAddress] = useState<any>({});
    console.log(address);

    const [payment, setPayment] = useState('Cash');
    const { mutate, contextHolder, isPending } = mutation_Order('ADD')
    const selectedProducts = data?.cart?.flatMap((cart: any) =>
        cart.products.filter((item: any) => item.status_checked)
    ) || [];

    const handleOpned = () => {
        setIsOpend(!isOpend);
    }
    const handleOrders = async () => {
        if (Object.keys(address).length === 0) {
            toast.warning("Vui lòng chọn địa chỉ trước khi thanh toán", { autoClose: 1000 });
            return
        }
        const orders_Data = {
            userId: userId,
            items: selectedProducts.map((product: any) => ({
                productId: product.productId._id,
                product_name: product.productId.name,
                product_image: product.productId.images[0],
                total_price_item: product.total_price_item,
                color: product.color,
                size: product.size,
                quantity: product.quantity,
                status_checked: product.status_checked,

            })),
            customerInfo: address,
            payment: payment,
            totalPrice: totalAmount
        }
        mutate(orders_Data)
    }
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, product: any) => (
                <img src={product?.productId?.images[0]} alt={product?.productId?.name} style={{ width: 100 }} />
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (_: any, product: any) => (
                <div className="flex flex-col">
                    <h1 className="font-bold text-xs lg:text-base">{truncate(product?.productId?.name, 30)}</h1>
                    <p>{product?.color} - {product?.size}</p>
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_: any, product: any) => (
                product?.total_price_item?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (_: any, product: any) => (
                (product?.quantity * product?.total_price_item)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ),
        },
    ];

    const dataSource = selectedProducts.map((product: any) => ({
        key: product._id,
        ...product
    }));
    const truncate = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    const totalAmount = dataSource.reduce((total: any, product: any) => total + (product.quantity * product.total_price_item), 0);
    return (
        <>
            <div className="lg:mx-28">
                {contextHolder}
                <h1 className="text-3xl">Thanh toán</h1>
                <div className="my-3 p-4 rounded bg-stone-50">
                    <p className="font-bold"><EnvironmentOutlined /> Địa chỉ nhận hàng:</p>
                    <div className="pt-3 flex gap-3">
                        {Object.keys(address).length === 0 ? (
                            <p>Chưa có địa chỉ</p>
                        ) : (
                            <div className="flex gap-3">
                                <span className="font-bold">{address.name}</span>
                                <span className="font-bold">{address.phone}</span>
                                <span>{address.address_detail} - {address.address}</span>
                            </div>
                        )}
                        <button className="ml-7 underline text-blue-300" onClick={handleOpned}>Thay đổi</button>
                    </div>
                </div>

                <Table columns={columns} dataSource={dataSource} pagination={false} />
                <div className="rounded bg-stone-50 my-4">
                    <div className="flex justify-between p-4">
                        <p className="font-bold">Đơn vị vận chuyển</p>
                        <Select
                            defaultValue="Nhanh"
                            className="w-[200px] lg:w-[300px]"
                            options={[
                                { value: 'Cash', label: 'Nhanh' },
                                { value: 'VNPAY', label: 'Hỏa tốc' },
                            ]}

                        />
                    </div>
                    <div className="flex justify-between border-t p-4">
                        <p className="font-bold">Voucher</p>
                        <span className="underline text-blue-300 cursor-pointer">Chọn Voucher</span>
                    </div>
                </div>
                <div className="rounded bg-stone-50">
                    <div className="flex justify-between p-4">
                        <p className="font-bold">Phương thức thanh toán</p>
                        <Select
                            defaultValue="Thanh toán khi nhận hàng"
                            className="w-[200px] lg:w-[300px]"
                            options={[
                                { value: 'Cash', label: 'Thanh toán khi nhận hàng' },
                                { value: 'VNPAY', label: 'VNPAY' },
                            ]}
                            onChange={(value) => setPayment(value)}
                        />
                    </div>
                    <div className="flex justify-between lg:justify-end gap-8 border-t border-b p-4">
                        <div className="py-5">
                            <p>Tổng tiền hàng:</p>
                            <p className="py-2">Phí vận chuyển:</p>
                            <p className="text-xl font-bold">Tổng thanh toán:</p>
                        </div>
                        <div className="py-5 flex flex-col items-end">
                            <p>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            <p className="py-2">0 VND</p>
                            <p className="text-xl font-bold">{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-center p-4">
                        <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Krist</p>
                        <button className="bg-black text-white px-5 py-3 my-3 rounded w-full lg:w-52" onClick={handleOrders} disabled={isPending}>
                            {isPending ? 'Đang xử lý...' : 'Đặt hàng'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-20" />
            {isOpend && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><Add_adderss handleOpned={handleOpned} setAddress={setAddress} /></div>}
        </>
    );
}

export default Page;
