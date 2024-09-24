import { TruckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const List_Orders = () => {
    const [selectedStatus, setSelectedStatus] = useState("all");

    const handleClick = (status: any) => {
        setSelectedStatus(status);
    };
    return (
        <>
            <div className=" flex justify-between py-2">
                {["all", "pending", "confirmed", "shipping", "completed", "canceled"].map((status) => (
                    <span
                        key={status}
                        onClick={() => handleClick(status)}
                        className={`cursor-pointer px-4 py-2 ${selectedStatus === status ? "border-b-2 border-blue-500" : ""}`}
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
            <div className="border py-6">
                <div className="border-b">
                    <p className="text-end pb-4 px-4 text-lg"><TruckOutlined /> Chờ xác nhận</p>
                </div>
                <div className="border-b">
                    <div className="flex justify-between items-center border-b p-4">
                        <img src="https://picsum.photos/300/300" className="w-[100px]" alt="" />
                        <div className="w-[60%]">
                            <h1 className="font-bold">Sản phẩm A</h1>
                            <p>Đen - 32 <span className="ml-2">X1</span></p>
                        </div>
                        <p>200.000 VND</p>
                    </div>
                </div>
                <p className="text-end text-lg font-bold my-3 px-4">Thành tiền: 200.000 VND</p>
                <div className="flex gap-8 items-center justify-between px-4">

                    <p className="w-[60%]">Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được
                        giao đến bạn và sản phẩm nhận được không có vấn đề nào.</p>

                    <div className="flex gap-4 w-[40%]">
                        <Button className="!bg-black !text-white p-5 w-full">Chờ xác nhận</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full">Đã nhận hàng</Button>
                        <Button className="!bg-red-500 !text-white p-5 w-full">Đánh giá</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default List_Orders;
