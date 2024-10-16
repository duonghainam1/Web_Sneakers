import { useVoucher } from "@/common/hooks/Voucher/useVoucher";
import type { Voucher } from "@/common/types/voucher";
import { Button, Card, Col, Row, Spin } from "antd"
const Voucher = () => {
    const { data, isLoading } = useVoucher();
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <Row gutter={16}>
            {data?.voucher?.map((voucher: Voucher) => {
                return (
                    <Col span={6} key={voucher._id}>
                        <Card title={voucher?.code_voucher} bordered={false} className="relative">
                            <div>

                                <p>{voucher?.description}</p>
                                <p>HSD: <span>{new Date(voucher?.endDate_voucher).toLocaleDateString('vi-VN')}</span></p>
                            </div>
                            <p className="absolute top-2 right-0 border rounded-l-full border-red-400 px-2 text-md" >X {voucher?.usageLimit_voucher}</p>
                            <div className="flex justify-center">
                                <Button type="primary" className="mt-2">Áp dụng</Button>
                            </div>
                        </Card>
                    </Col>
                )
            })}

        </Row>
    )
}

export default Voucher