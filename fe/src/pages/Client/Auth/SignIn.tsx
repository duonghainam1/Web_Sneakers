/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutationAuth } from "@/common/hooks/Auth/mutationAuth";
import { Button, Checkbox, Form, Input } from "antd"
import { Link } from "react-router-dom"

const SignIn = () => {
    const { mutate, contextHolder } = mutationAuth('SIGNIN')
    const onFinish = (values: any) => {
        mutate(values)
    };
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            {contextHolder}
            <div className="bg-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <Form
                    name="signIn"
                    layout="vertical"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    className="space-y-4"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                    >
                        <Input
                            placeholder="Email"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-between items-center">
                        <Checkbox>Ghi nhớ</Checkbox>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Bạn chưa có tài khoản?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>


    )
}

export default SignIn