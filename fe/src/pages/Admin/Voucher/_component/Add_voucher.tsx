/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProducts } from "@/common/hooks/Products/useProducts";
import { mutation_Voucher } from "@/common/hooks/Voucher/mutation_Voucher";
import { Products_Type } from "@/common/types/products";
import { LeftOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
const { Option } = Select;

const Add_voucher = () => {
    const [form] = Form.useForm();
    const { data } = useProducts();
    const { mutate, contextHolder } = mutation_Voucher('ADD')
    const onFinish = (values: any) => {
        mutate(values)
        form.resetFields()
    }
    return (
        <div>
            {contextHolder}
            <div className="relative flex items-center justify-between my-6">
                <Link to="/admin/voucher" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Thêm Voucher
                </h1>
            </div>
            <Form
                layout="vertical"
                name="Add_voucher"
                onFinish={onFinish}
                form={form}
            >
                <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
                    <div className="w-full">
                        <Form.Item
                            label="Mã voucher"
                            name="code_voucher"
                            rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
                        >
                            <Input className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả về voucher"
                            name="description"
                        >
                            <TextArea rows={4} className="w-full" />
                        </Form.Item>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <Form.Item
                                label="Loại Giảm Giá"
                                name="discountType_voucher"
                                rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá!' }]}
                                className="w-full"
                            >
                                <Select className="w-full">
                                    <Option value="percent">Giảm %</Option>
                                    <Option value="fixed">Giảm số tiền cố định</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Giá trị Giảm Giá"
                                name="discount_voucher"
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                                className="w-full"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Ngày Áp Dụng"
                            name="startDate_voucher"
                            rules={[{ required: true, message: 'Vui lòng chọn khoảng thời gian!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate_voucher"
                            rules={[{ required: true, message: 'Vui lòng chọn khoảng thời gian!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <Form.Item
                                label="Số Lần Sử Dụng"
                                name="usageLimit_voucher"
                                className="w-full"
                            >
                                <InputNumber min={1} className="w-full" />
                            </Form.Item>

                            <Form.Item
                                label="Gía trị tối thiểu"
                                name="minimumOrderValue_voucher"
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' }]}
                                className="w-full"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>

                            <Form.Item
                                label="Giảm Giá Tối Đa"
                                name="maximumDiscount_voucher"
                                className="w-full"
                            >
                                <InputNumber min={0} className="w-full" />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Sản Phẩm Áp Dụng"
                            name="appliedProducts_voucher"
                        >
                            <Select mode="multiple" placeholder="Chọn sản phẩm" className="w-full">
                                {data?.products?.docs?.map((product: Products_Type) => (
                                    <Option key={product._id} value={product._id}>
                                        <div className="flex items-center">
                                            <span>{product?.name}</span>
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Trạng Thái"
                            name="status_voucher"
                            valuePropName="checked"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        >
                            <Switch />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item className="mt-6">
                    <Button type="primary" htmlType="submit" className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700">
                        Tạo Voucher
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Add_voucher;
