import { useAuth } from "@/common/hooks/Auth/useAuth"
import { useDashboard } from "@/common/hooks/Dashboard/useDashboard"
import { useOrder } from "@/common/hooks/Order/useOrder"
import { useProducts } from "@/common/hooks/Products/useProducts"
import { ArrowUpOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"

export const Col_Revenue_By_Day = () => {
    const { data } = useDashboard()
    const { data: auth } = useAuth()
    const { data: orders } = useOrder();
    const { data: product } = useProducts()
    const currenDate = new Date().toISOString().split('T')[0];
    const totalRevenue = data?.revenueByDay?.[currenDate] || { total: 0, totalOrder: 0 };
    const formattedRevenue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalRevenue.total);

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card>
                        <Statistic
                            title={
                                <div className="flex justify-between">
                                    <span>
                                        Tổng doanh thu
                                    </span>
                                    <span>
                                        Ngày: {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            }
                            value={formattedRevenue}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix=""
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card>
                        <Statistic
                            title={
                                <div className="flex justify-between">
                                    <span>
                                        Tổng số đơn hàng
                                    </span>
                                    {/* <span>
                                        Ngày: {new Date().toLocaleDateString()}
                                    </span> */}
                                </div>
                            }
                            value={orders?.data?.totalDocs}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số khách hàng"
                            value={auth?.user?.length}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số sản phẩm"
                            value={product?.products?.totalDocs}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
