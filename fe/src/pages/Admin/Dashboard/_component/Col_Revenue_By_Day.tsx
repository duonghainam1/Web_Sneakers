import { useAuth } from "@/common/hooks/Auth/useAuth"
import { useDashboard } from "@/common/hooks/Dashboard/useDashboard"
import { ArrowUpOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"

export const Col_Revenue_By_Day = () => {
    const { data } = useDashboard()
    const { data: auth } = useAuth()
    const totalRevenue: any = Object.values(data?.revenueByDay || {}).reduce(
        (acc, day: any) => acc + day.total,
        0
    );
    const formattedRevenue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalRevenue);
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
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
                <Col span={8}>
                    <Card>
                        <Statistic
                            title={
                                <div className="flex justify-between">
                                    <span>
                                        Tổng số đơn hàng
                                    </span>
                                    <span>
                                        Ngày: {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            }
                            value={data?.totalOrder}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
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
            </Row>

        </div>
    )
}
