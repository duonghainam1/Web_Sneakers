import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
    name?: string;
    phone?: string;
    address?: string;
    address_detail?: string;
};



const Add_adderss = ({ handleOpned, setAddress }: any) => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setAddress(values)
    };

    return (
        <div className="relative bg-white w-[600px] h-[400px] p-5 rounded flex items-center justify-between ">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="w-full"
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên người mua"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Địa chỉ cụ thể"
                    name="address_detail"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>

            </Form>
            <Button onClick={handleOpned} className="absolute top-0 right-0 border m-3 w-8 h-8 rounded-full flex justify-center"><CloseOutlined /></Button>
        </div>
    )
}

export default Add_adderss