import { mutationAuth } from '@/common/hooks/Auth/mutationAuth';
import { useAuth } from '@/common/hooks/Auth/useAuth';
import { useLocalStorage } from '@/common/hooks/useStorage';
import Add_adderss from '@/components/address/Add_adderss';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useState } from 'react';
const { Title, Text } = Typography;

const List_address = () => {
    const [user] = useLocalStorage('user', {})
    const userId = user?.data?.user?._id;
    const [isOpend, setIsOpend] = useState(false);
    const { mutate, contextHolder } = mutationAuth("DELETE_ADDRESS")
    const { mutate: update_Isdefault, contextHolder: update } = mutationAuth("UPDATE_ISDEFAULT")
    const { data } = useAuth(userId)
    const handleOpned = () => {
        setIsOpend(!isOpend);
    }
    const handleDelete = (id: any) => {
        mutate({ userId, addressId: id });
    }
    const handleUpdate_Isdefault = (id: any) => {
        console.log(id);

        update_Isdefault({ userId, addressId: id })
    }
    return (
        <div className="min-h-96 mb-4 bg-white ">
            {contextHolder || update}
            <div className="flex justify-between items-center p-4 border-b">
                <Title level={4}>Danh sách địa chỉ</Title>
                <Button type="primary" onClick={handleOpned}>Thêm địa chỉ mới</Button>
            </div>
            <div className="p-4 overflow-x-hidden">
                <Row gutter={[16, 16]}>
                    {data?.user?.address?.map((address: any, index: any) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card title="Địa chỉ nhận hàng" bordered>
                                <Text strong>{address?.userName}</Text>
                                <p> {address?.address_detail} - {address?.address}</p>
                                <Text>Số điện thoại: {address?.phone}</Text>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '16px' }}>
                                    {address?.isDefault === true ? <Button type="primary">Mặc định</Button> : <Button type="primary" onClick={() => handleUpdate_Isdefault(address?._id)}>Đặt làm mặc định</Button>}
                                    <div>
                                        <Button type="default" style={{ marginRight: '8px' }}>Sửa</Button>
                                        <Button danger onClick={() => handleDelete(address?._id)}>Xóa</Button>
                                    </div>

                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {isOpend && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> <Add_adderss handleOpned={handleOpned} /></div>}
        </div>

    );
};

export default List_address;
