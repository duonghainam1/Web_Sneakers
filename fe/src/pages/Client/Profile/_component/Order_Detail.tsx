/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrder } from "@/common/hooks/Order/useOrder";
import { BackwardOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Spin, Table, Tag, Timeline } from "antd";
import { Link, useParams } from "react-router-dom";

const Order_Detail = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrder(id);
    const dataSource = data?.items?.map((item: any) => {
        return {
            key: item.productId,
            ...item,
        };
    });
    const columns = [
        {
            title: "Ảnh",
            dataIndex: "product_image",
            key: "product_image",
            render: (_: any, product: any) => (
                <img src={product?.product_image} alt="product" className=" w-[100px]" />
            ),
        },
        {
            title: "Tên",
            dataIndex: "product_name",
            key: "product_name",
            render: (_: any, product: any) => (
                <div>
                    <p>{product?.product_name?.length > 50 ? `${product?.product_name.substring(0, 50)}...` : product?.product_name}</p>
                    <div className="flex gap-1 pt-4">
                        <Tag color="green">Màu: {product?.color}</Tag>
                        <Tag color="blue">Size: {product?.size}</Tag>
                    </div>
                </div>
            ),
        },
        {
            title: "Giá",
            dataIndex: "total_price_item",
            key: "total_price_item",
            render: (total_price_item: number) =>
                total_price_item?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    const statusList = [
        { code: "1", label: "Chờ xác nhận", date: data?.createdAt },
        { code: "2", label: "Đang xử lý", date: data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "2")?.updatedAt },
        { code: "3", label: "Đang giao", date: data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "3")?.updatedAt },
        { code: "4", label: "Đã giao", date: data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "4")?.updatedAt },
        { code: "6", label: "Hoàn thành", date: data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "6")?.updatedAt },
        { code: "5", label: "Đã hủy", date: data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "5")?.updatedAt },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Chờ xác nhận":
                return "orange";
            case "Đang xử lý":
                return "blue";
            case "Đang giao":
                return "green";
            case "Đã giao":
                return "yellow";
            case "Hoàn thành":
                return "pink";
            default:
                return "red";
        }
    };
    const currentStatusCode = data?.status;
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <div>
            <Card title={
                <div className="flex items-center">
                    <Link to="/profile/list_orders">
                        <Button><BackwardOutlined /></Button>
                    </Link>
                    <h1 className="mx-auto text-center text-lg font-semibold">Chi tiết đơn hàng: {data?.orderNumber}</h1>
                </div>
            } bordered={false}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Mã đơn hàng">{data?.orderNumber}</Descriptions.Item>
                    <Descriptions.Item label="Tên khách hàng">{data?.customerInfo?.userName}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{data?.customerInfo?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt hàng">  {new Date(data?.createdAt).toLocaleString('vi-VN')}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng">
                        {data?.customerInfo?.address_detail} - {data?.customerInfo?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức thanh toán">{data?.payment}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {data?.totalPrice?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái đơn hàng">
                        <Timeline>
                            {currentStatusCode !== "5" ? (
                                statusList.map((status) => {
                                    if (parseInt(currentStatusCode) >= parseInt(status.code)) {
                                        return (
                                            <Timeline.Item
                                                key={status?.code}
                                                color={parseInt(currentStatusCode) >= parseInt(status?.code) ? "green" : "gray"}
                                            >
                                                <Tag color={getStatusColor(status?.label)}>{status?.label}</Tag>
                                                <div className="py-2">
                                                    {status?.date ? new Date(status.date).toLocaleString('vi-VN') : 'Chưa có dữ liệu'}
                                                </div>
                                            </Timeline.Item>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <Timeline.Item color="red">
                                    <Tag color={getStatusColor("5")}>Đã hủy</Tag>
                                    <div className="py-2">
                                        {data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "5")?.updatedAt
                                            ? new Date(data?.statusHistory.find((statusHistory: any) => statusHistory?.status === "5")?.updatedAt).toLocaleString('vi-VN')
                                            : 'Chưa có dữ liệu'}
                                    </div>
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title="Danh sách sản phẩm" bordered={false} style={{ marginTop: "20px" }}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Card>
        </div>
    );
};

export default Order_Detail;
