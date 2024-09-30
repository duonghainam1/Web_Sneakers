import { useOrderById } from "@/common/hooks/Order/useOrder";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { TruckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const List_Orders = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { data, isLoading } = useOrderById(userId);
    const handleClick = (status: any) => {
        setSelectedStatus(status);
    };
    if (isLoading) return <p>Loading...</p>;
    return (
        <>
            <div className="flex overflow-x-auto py-2 scrollbar-hide hidden_scroll_x">
                {["all", "pending", "confirmed", "shipping", "completed", "canceled"].map((status) => (
                    <span
                        key={status}
                        onClick={() => handleClick(status)}
                        className={`cursor-pointer px-4 py-2 whitespace-nowrap ${selectedStatus === status ? "border-b-2 border-blue-500" : ""}`}
                    >
                        {status === "all" ? "Tất cả" :
                            status === "pending" ? "Chờ xác nhận" :
                                status === "confirmed" ? "Đã xác nhận" :
                                    status === "shipping" ? "Đang giao" :
                                        status === "completed" ? "Hoàn thành" :
                                            "Đã hủy"}
                    </span>
                ))}
            </div>
            {data?.data?.length === 0 && <p>Không có đơn hàng nào</p>}
            {data?.data?.map((order: any) => {
                return order?.items?.map((item: any, index: any) => {
                    return (
                        <div className="border rounded py-6 mb-6" key={index}>
                            <div className="border-b">
                                <p className="text-end pb-4 px-4 text-lg">
                                    <TruckOutlined /> {order.status}
                                </p>
                            </div>
                            <div className="border-b">
                                <div className="flex gap-4 md:flex-row justify-between items-center border-b p-4">
                                    <img src={item.product_image} className="w-[100px] mb-4 md:mb-0" alt="" />
                                    <div className="w-full md:w-[60%]">
                                        <h1 className="font-bold">{item?.product_name}</h1>
                                        <p>{item?.color} - {item?.size} <span className="ml-2">X1</span></p>
                                    </div>
                                    <p className="text-end mt-2 md:mt-0">{item?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                            <p className="text-end text-lg font-bold my-3 px-4">Thành tiền: {order?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4">

                                <p className="w-full md:w-[60%]">
                                    Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.
                                </p>

                                <div className="flex md:flex-row gap-4 w-full md:w-[40%]">
                                    <Button className="!bg-black !text-white p-5 w-full">Chờ xác nhận</Button>
                                    <Button className="!bg-red-500 !text-white p-5 w-full">Đã nhận hàng</Button>
                                    {/* <Button className="!bg-red-500 !text-white p-5 w-full">Đánh giá</Button> */}
                                </div>
                            </div>
                        </div>
                    )
                })

            })}



        </>
    );
};

export default List_Orders;
