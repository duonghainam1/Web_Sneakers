import { Table, Tag } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Col_Revenue_By_Day } from "./_component/Col_Revenue_By_Day";
import { useDashboard_month, useDashboard_order_limit } from "@/common/hooks/Dashboard/useDashboard";

const Page = () => {
    const { data: month } = useDashboard_month()
    const revenueData = month?.data?.map((item: any) => ({
        name: item.month,
        revenue: item.totalRevenue
    })) || [];
    const { data: limit } = useDashboard_order_limit()
    const data_limit = limit?.map((order: any) => {
        return {
            key: order?._id,
            ...order
        }
    })
    const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    const ramdomColor = () => {
        return (
            colors[Math.floor(Math.random() * colors.length)]
        )
    };
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (_: any, order: any) => {
                return <a href={`/admin/orders/${order._id}`}>{order.orderNumber}</a>
            }
        },
        {
            title: 'Người mua',
            dataIndex: 'customer',
            key: 'customer',
            render: (_: any, order: any) => {
                return order.customerInfo?.userName
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_: any, order: any) => {
                return order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, order: any) => {
                return (
                    <Tag color={ramdomColor()}>{order?.status == 1 ? "Chờ xác nhận" : order?.status == 2 ? 'Đang chuẩn bị hàng' : order?.status == 3 ? 'Đang vận chuyển' : order?.status == 4 ? 'Đã giao' : order?.status == 6 ? 'Hoàn thành' : "Đã hủy"}</Tag>
                )
            }
        },
    ];
    const topProducts = [
        { key: '1', name: 'Product A', sales: 120 },
        { key: '2', name: 'Product B', sales: 98 },
        { key: '3', name: 'Product C', sales: 75 },
        { key: '4', name: 'Product D', sales: 60 },
        { key: '5', name: 'Product E', sales: 45 },
    ];

    const topProductsColumns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
        },
    ];

    return (
        <div className="p-2 lg:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6">Thống kê</h1>

            <Col_Revenue_By_Day />
            <div className="mt-6">
                <h2 className="text-lg sm:text-2xl font-semibold mb-4">Biểu đồ doanh thu</h2>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 400}>
                        <LineChart
                            data={revenueData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Đơn hàng gần đây</h2>
                <Table columns={columns} dataSource={data_limit} scroll={{ x: 1000 }} pagination={false} />
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Sản phẩm bán chạy nhất</h2>
                <Table columns={topProductsColumns} dataSource={topProducts} scroll={{ x: 1000 }} />
            </div>
        </div>
    );
};

export default Page;