import { useOrderById } from "@/common/hooks/Order/useOrder";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { TruckOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const List_Orders = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { data, isLoading } = useOrderById(userId);
    const handleClick = (status: any) => {
        setSelectedStatus(status);
    };
    if (isLoading) return <p>Loading...</p>;
    const filteredOrders = data?.data?.filter((order: any) => {
        if (selectedStatus === "all") return true;
        return order.status === selectedStatus;
    });
    return (
        <>
            <div className="flex overflow-x-auto py-2 scrollbar-hide hidden_scroll_x">
                {["all", "1", "2", "3", "4", "5", "6"].map((status) => (
                    <span
                        key={status}
                        onClick={() => handleClick(status)}
                        className={`cursor-pointer px-4 py-2 whitespace-nowrap ${selectedStatus === status ? "border-b-2 border-blue-500" : ""}`}
                    >
                        {status === "all" ? "Tất cả" :
                            status === "1" ? "Chờ xác nhận" :
                                status === "2" ? "Đang xử lý" :
                                    status === "3" ? "Đang giao" :
                                        status === "4" ? "Đã giao" :
                                            status === "6" ? "Hoàn thành" :
                                                "Đã hủy"}
                    </span>
                ))}
            </div>
            {filteredOrders?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {filteredOrders?.map((order: any) => {
                return order?.items?.map((item: any, index: any) => {
                    return (
                        <div className="border rounded mb-6" key={index}>
                            <div className="border-b flex justify-between p-4">
                                <Link to={`/profile/list_orders/${order._id}`}><Button>Xem Ngay</Button></Link>
                                <p className="text-end text-lg">
                                    <TruckOutlined /> {order.status === "1" ? "Chờ xác nhận" : order.status === "2" ? "Đang xử lý" : order.status === "3" ? "Đang giao" : order.status === "4" ? "Đã giao" : order.status === "6" ? "Hoàn thành" : "Đã hủy"}
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
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4">
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
                    );
                });
            })}
        </>
    );
};

export default List_Orders;
