/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Col_Revenue_By_Day } from "./_component/Col_Revenue_By_Day";
import { useDashboard_month } from "@/common/hooks/Dashboard/useDashboard";

const Page = () => {
    const { data: month } = useDashboard_month()
    const revenueData = month?.data?.map((item: any) => ({
        name: item.month,
        revenue: item.totalRevenue
    })) || [];
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const data = [
        {
            key: '1',
            orderId: '12345',
            customer: 'John Doe',
            total: '$100',
            status: 'Completed',
        },
        {
            key: '2',
            orderId: '12346',
            customer: 'Jane Smith',
            total: '$150',
            status: 'Pending',
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
                <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Sản phẩm bán chạy nhất</h2>
                <Table columns={topProductsColumns} dataSource={topProducts} scroll={{ x: 1000 }} />
            </div>
        </div>
    );
};

export default Page;