import { Card, Col, Row, Statistic, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Page = () => {
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
        // Add more data as needed
    ];

    const revenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
        { name: 'Jul', revenue: 3490 },
        { name: 'Aug', revenue: 2000 },
        { name: 'Sep', revenue: 2780 },
        { name: 'Oct', revenue: 1890 },
        { name: 'Nov', revenue: 2390 },
        { name: 'Dec', revenue: 3490 },
    ];

    const topProducts = [
        { key: '1', name: 'Product A', sales: 120 },
        { key: '2', name: 'Product B', sales: 98 },
        { key: '3', name: 'Product C', sales: 75 },
        { key: '4', name: 'Product D', sales: 60 },
        { key: '5', name: 'Product E', sales: 45 },
        // Add more products as needed
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6">Thống kê</h1>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng doanh số"
                            value={112893}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="$"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng số đơn hàng"
                            value={93}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng số khách hàng"
                            value={1128}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Biểu đồ doanh thu</h2>
                <ResponsiveContainer width="100%" height={400}>
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
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Đơn hàng gần đây</h2>
                <Table columns={columns} dataSource={data} />
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Sản phẩm bán chạy nhất</h2>
                <Table columns={topProductsColumns} dataSource={topProducts} />
            </div>
        </div>
    );
};

export default Page;