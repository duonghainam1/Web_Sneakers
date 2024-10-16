/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Form, Typography } from "antd";
import { useAuth } from "@/common/hooks/Auth/useAuth";
import { useLocalStorage } from "@/common/hooks/useStorage";
const { Title, Text } = Typography;

const Profile = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState<any>(null);
    const { data } = useAuth(userId)
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data?.user?.name,
                email: data?.user?.email,
                phone: data?.user?.phone,
            });
        }
    }, [data, form]);
    const handleUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            <div className="border-b pb-2">
                <Title level={4}>Hồ sơ của tôi</Title>
                <Text type="secondary">Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
            </div>
            <div className="flex gap-4 p-4">
                <div className="w-[70%] border-r p-4">
                    <Form form={form} layout="vertical" onFinish={handleSubmit} className=" flex flex-col justify-center items-center">
                        <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                            <Input placeholder="Nhập tên của bạn" className="w-[400px]" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                            <Input type="email" placeholder="Nhập email của bạn" className="w-[400px]" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input placeholder="Nhập số điện thoại của bạn" className="w-[400px]" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="w-[30%] flex flex-col gap-y-8 items-center justify-center">
                    <Avatar size={200} icon={avatar ? <img src={avatar} alt="avatar" /> : <UserOutlined />} />
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} id="upload-avatar" />
                    <label htmlFor="upload-avatar">
                        <Button type="default">Chọn ảnh</Button>
                    </label>
                </div>
            </div>
        </div>

    );
};

export default Profile;
