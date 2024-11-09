import { mutationAuth } from "@/common/hooks/Auth/mutationAuth";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input } from "antd";

type FieldType = {
    userName?: String;
    phone?: String;
    address?: String;
    address_detail?: String;
    checked?: boolean;
};
const Add_adderss = ({ handleOpned }: any) => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { mutate } = mutationAuth('ADD_ADDRESS')
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        handleOpned()
        const data_form = {
            userId: userId,
            newAddress: [values],
            setDefault: values.checked
        };
        mutate(data_form)

    };

    return (

        <div className="relative bg-white w-full max-w-sm md:max-w-md lg:max-w-xl p-5 rounded shadow-md flex flex-col">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên người mua"
                    name="userName"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 2, message: 'Tên người mua phải lớn hơn 2 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your password!' },
                    { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
                    ]}
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
                <Form.Item
                    name="checked"
                    valuePropName="checked"
                >
                    <Checkbox>Đặt làm mặc định</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={handleOpned} className="absolute top-0 right-0 border m-3 w-8 h-8 rounded-full flex justify-center"><CloseOutlined /></Button>
        </div>
    )
}

export default Add_adderss