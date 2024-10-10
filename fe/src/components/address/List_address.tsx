import { Card, Button, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const List_address = () => {
    const addresses = [
        {
            name: 'Nguyễn Văn A',
            address: 'Số 10, ngõ 20, Đường Lê Văn Lương, Thanh Xuân, Hà Nội',
            phone: '0123456789',
        },
        {
            name: 'Nguyễn Văn B',
            address: 'Số 15, ngõ 30, Đường Lê Văn Lương, Thanh Xuân, Hà Nội',
            phone: '0123456788',
        },
        {
            name: 'Nguyễn Văn C',
            address: 'Số 20, ngõ 40, Đường Lê Văn Lương, Thanh Xuân, Hà Nội',
            phone: '0123456787',
        },
    ];

    return (
        <div className="min-h-96 mb-4">
            <div className="flex justify-between items-center p-4 border-b">
                <Title level={4}>Danh sách địa chỉ</Title>
                <Button type="primary">Thêm địa chỉ mới</Button>
            </div>
            <div className="py-4">
                <Row gutter={[16, 16]}>
                    {addresses.map((address, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card title="Địa chỉ nhận hàng" bordered>
                                <Text strong>{address.name}</Text>
                                <p>{address.address}</p>
                                <Text>Số điện thoại: {address.phone}</Text>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                    <Button type="default" style={{ marginRight: '8px' }}>Sửa</Button>
                                    <Button danger>Xóa</Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default List_address;
