import { Link } from "react-router-dom"
import { Form, Input, Button, Checkbox } from 'antd';
import { mutationAuth } from "@/common/hooks/Auth/mutationAuth";
const SignUp = () => {
    const { mutate, contextHolder } = mutationAuth('SIGNUP')
    const onFinish = (values: any) => {
        console.log('Success:', values);
        mutate(values)
    };
    return (

        <div className="bg-gray-100 h-screen flex items-center justify-center">
            {contextHolder}
            <div className="bg-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng Ký</h2>
                <Form
                    name="signUp"
                    layout="vertical"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    className="space-y-4"
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            placeholder="Tên đăng nhập"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email của bạn!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập lại mật khẩu"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item valuePropName="checked" rules={[{ required: true, message: 'Bạn phải đồng ý với các điều khoản!' }]}>
                        <Checkbox>
                            Tôi đồng ý với các điều khoản và điều kiện
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Bạn đã có tài khoản?{' '}
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default SignUp