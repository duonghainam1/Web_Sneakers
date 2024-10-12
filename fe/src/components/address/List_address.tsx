import { useAuth } from '@/common/hooks/Auth/useAuth';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { Card, Button, Row, Col, Typography, Checkbox } from 'antd';
import { useState } from 'react';
import Add_adderss from './Add_adderss';
import { mutationAuth } from '@/common/hooks/Auth/mutationAuth';

const { Title, Text } = Typography;

const List_address = ({ handleOpnedPay, setAddress }: any) => {
    const [user] = useLocalStorage('user', {})
    const userId = user?.data?.user?._id;
    const [isOpend, setIsOpend] = useState(false);
    const { data } = useAuth(userId)
    const { mutate, contextHolder } = mutationAuth('UPDATE_ISDEFAULT')
    const { mutate: delete_address, contextHolder: a } = mutationAuth('DELETE_ADDRESS')
    const handleUpdateDefault = async (addressId: any) => {
        const data_form = {
            userId: userId,
            addressId: addressId
        };
        mutate(data_form)
    }
    const handleDeleteAddress = async (addressId: any) => {
        const data_form = {
            userId: userId,
            addressId: addressId
        };
        delete_address(data_form)
    }
    const checkboxAddress = (data_form: any) => {
        setAddress(data_form)
        handleOpnedPay()
    }
    const handleOpned = () => {
        setIsOpend(!isOpend);
    }
    return (
        <div className="max-h-[600px] mb-4 bg-white w-[1200px] overflow-auto hidden_scroll_x rounded mt-16 mx-2">
            {contextHolder}
            {a}
            <div className="flex justify-between items-center p-4 border-b">
                <Title level={4}>Danh sách địa chỉ</Title>
                <Button type="primary" onClick={handleOpned}>Thêm</Button>
            </div>
            <div className="p-4 ">
                <Row gutter={[16, 16]}>
                    {data?.user?.address?.map((address: any, index: any) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card title="Địa chỉ nhận hàng" bordered>
                                <div className='flex justify-between'>
                                    <div>
                                        <Text strong>{address?.userName}</Text>
                                        <p> {address?.address_detail} - {address?.address}</p>
                                        <Text>Số điện thoại: {address?.phone}</Text>
                                    </div>
                                    <Checkbox onClick={() => checkboxAddress(address)}></Checkbox>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '16px' }}>
                                    {address?.isDefault === true ? <Button type="primary">Mặc định</Button> : <Button type="primary" onClick={() => handleUpdateDefault(address?._id)}>Đặt làm mặc định</Button>}
                                    <div>
                                        <Button type="default" style={{ marginRight: '8px' }}>Sửa</Button>
                                        <Button danger onClick={() => handleDeleteAddress(address?._id)}>Xóa</Button>
                                    </div>

                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="sticky bottom-0 bg-white p-4  flex justify-end">
                    <Button onClick={handleOpnedPay}>Đóng</Button>
                </div>
            </div>

            {isOpend && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> <Add_adderss handleOpned={handleOpned} /></div>}

        </div>

    );
};

export default List_address;
