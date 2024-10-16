/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrderById } from "@/common/hooks/Order/useOrder";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { TruckOutlined } from "@ant-design/icons";
import { Button, Empty, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button_orders from "./Button_orders";

const List_Orders = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [searchParmas, setSearchParams] = useSearchParams();
    const currenPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currenPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { data, isLoading, totalDocs } = useOrderById(userId, currenPage, pageSize);

    useEffect(() => {
        const params: any = {}
        if (currenPage !== 1) {
            params["page"] = currenPage;
        }
        if (pageSize !== 10) {
            params["pageSize"] = pageSize;
        }
        setSearchParams(params);
    }, [currenPage, pageSize, setSearchParams]);
    const handleClick = (status: any) => {
        setSelectedStatus(status);
    };

    const filteredOrders = data?.data?.docs?.filter((order: any) => {
        if (selectedStatus === "all") return true;
        return order.status === selectedStatus;
    });
    console.log(filteredOrders);

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <>
            <div className="flex overflow-x-auto py-2 scrollbar-hide hidden_scroll_x">
                {["all", "1", "2", "3", "4", "6", "5"].map((status) => (
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
            {filteredOrders?.map((order: any, index: any) => (
                <div className="border rounded mb-6" key={index}>
                    <div className="border-b flex justify-between p-4">
                        <Link to={`/profile/list_orders/${order._id}`}><Button>Xem Ngay</Button></Link>
                        <p className="text-end text-lg">
                            <TruckOutlined /> {order.status === "1" ? "Chờ xác nhận" : order.status === "2" ? "Đang xử lý" : order.status === "3" ? "Đang giao" : order.status === "4" ? "Đã giao" : order.status === "6" ? "Hoàn thành" : "Đã hủy"}
                        </p>
                    </div>
                    {order?.items?.map((item: any, index: any) => (
                        <div className="border-b" key={index}>
                            <div className="flex gap-4 md:flex-row justify-between items-center border-b p-4">
                                <img src={item.product_image} className="w-[100px] mb-4 md:mb-0" alt="" />
                                <div className="w-full md:w-[60%]">
                                    <h1 className="font-bold">{item?.product_name}</h1>
                                    <p>{item?.color} - {item?.size} <span className="ml-2">X1</span></p>
                                </div>
                                <p className="text-end mt-2 md:mt-0">{item?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    ))}

                    <p className="text-end text-lg font-bold my-3 px-4">Thành tiền: {order?.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                    <Button_orders order={order} />
                </div>
            ))}
            <Pagination
                current={currenPage}
                total={totalDocs}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger
                onShowSizeChange={(_, size) => setPageSize(size)}
                align="center"
                className="my-8"
            />
        </>
    );
};

export default List_Orders;
