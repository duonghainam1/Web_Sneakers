import { mutation_Order } from "@/common/hooks/Order/mutation_Order";
import { Button, message } from "antd"

const Button_orders = (order: any) => {
    const { mutate: Update } = mutation_Order('UPDATE')
    // const { mutate, contextHolder, isPending } = mutation_Order('ADD')
    console.log(order);

    const handle_Update_Status = async (newStatus: string) => {
        console.log(newStatus);

        try {
            await Update({ id: order.order._id, status: newStatus });
            message.success('Cập nhật trạng thái đơn hàng thành công!');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật trạng thái.');
        }
    }
    // const handleAddToCart = () => {
    //     const productData = {
    //         productId: data_Detail.product._id,
    //         userId: order?.order.userId
    //         quantity,
    //         size: selectedSize,
    //         color: selectedColor,
    //         total_price_item: priceItem,
    //         total_price: (priceItem ?? 0) * quantity,
    //         status_checked: false
    //     };
    //     mutate(productData);
    // };
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4">
            <p className="w-full md:w-[60%]">
                Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.
            </p>
            {order?.order?.status === "1" ? (
                <>
                    <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                        <Button className="!bg-black !text-white p-5 w-full cursor-default" disabled>Chờ xác nhận</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full" onClick={() => handle_Update_Status('5')}>Hủy</Button>
                    </div>
                </>
            ) : order?.order?.status === "2" ? (
                <>
                    <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                        <Button className="!bg-gray-300 !text-white p-5 w-full cursor-default" disabled>Đang chuẩn bị</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full " >Yêu cầu hủy</Button>
                    </div>
                </>
            ) : order?.order?.status === "3" ? (
                <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                    <Button className="!bg-gray-300 !text-white p-5 w-full cursor-default" disabled>Đang vận chuyển</Button>
                </div>
            ) : order?.order?.status === "4" ? (
                <>
                    <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                        <Button className="!bg-red-500 !text-white p-5 w-full cursor-default" disabled>Đã giao</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full">Đã nhận hàng</Button>
                    </div>
                </>
            ) : order?.order?.status === "6" ? (
                <>
                    <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                        <Button className="!bg-red-500 !text-white p-5 w-full">Hoàn thành</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full">Đánh giá</Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                        <Button className="!bg-red-500 !text-white p-5 w-full cursor-default" disabled>Đã hủy</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full">Mua lại</Button>
                    </div>
                </>
            )}

        </div>
    )
}

export default Button_orders