import { useState } from 'react';
import { Form, Input, Select, Button, Upload, Space, message, Checkbox } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { uploadFileCloudinary } from '@/common/lib/utils';
import { useCategory } from '@/common/hooks/Category/useCategory';
import { mutation_Products } from '@/common/hooks/Products/mutation_Products';


const { Option } = Select;

const AddProducts = () => {
    const [form] = Form.useForm();
    const [attributes, setAttributes] = useState([{ color: '', images: [], sizes: [{ size: '', price: '', stock: '' }] }]);
    const { data, isLoading } = useCategory();
    const { mutate, contextHolder } = mutation_Products(`ADD`)
    const onFinish = async (values: any) => {
        try {
            const uploadedProductImages = await Promise.all(values.images.map((file: any) => uploadFileCloudinary(file.originFileObj)));
            const formattedAttributes = await Promise.all(values.attributes.map(async (attribute: any) => ({
                color: attribute.color,
                images: await Promise.all(attribute.images.map((file: any) => uploadFileCloudinary(file.originFileObj))),
                sizes: attribute.sizes.map((size: any) => ({
                    size: size.size,
                    price: size.price,
                    stock: size.stock,
                })),
            })));
            const productData = {
                name: values.name,
                description: values.description,
                category: values.category,
                images: uploadedProductImages,
                sku: values.sku,
                attributes: formattedAttributes,
                featured: values.featured || false,
            };
            mutate(productData);
            form.resetFields();
        } catch (error) {
            console.error('Error processing form data:', error);
            message.error('Có lỗi xảy ra khi xử lý dữ liệu.');
        }
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { color: '', images: [], sizes: [{ size: '', price: '', stock: '' }] }]);
    };
    const handleRemoveAttribute = (index: number) => {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAttributes(updatedAttributes);
    };
    if (isLoading) return <p>Loading...</p>
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md">
            {contextHolder}
            <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
            >
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" className="p-2" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" className="p-2" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                >
                    <Select placeholder="Chọn danh mục">
                        {data?.map((category: any) => (
                            <Option key={category._id} value={category._id}>{category.category_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="images"
                    label="Ảnh sản phẩm"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload name="images" listType="picture" multiple>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="sku"
                    label="SKU"
                >
                    <Input placeholder="Nhập SKU" className="p-2" />
                </Form.Item>
                <div className="space-y-6">
                    {attributes.map((_, index) => (
                        <div key={index} className="border p-4 rounded-md space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold">Thuộc tính {index + 1}</h2>
                                {attributes.length > 1 && (
                                    <Button danger icon={<MinusCircleOutlined />} onClick={() => handleRemoveAttribute(index)}>
                                        Xóa thuộc tính
                                    </Button>
                                )}
                            </div>

                            <Form.Item
                                name={['attributes', index, 'color']}
                                label="Màu sắc"
                                rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
                            >
                                <Input placeholder="Nhập màu sắc" className="p-2" />
                            </Form.Item>

                            <Form.Item
                                name={['attributes', index, 'images']}
                                label="Ảnh thuộc tính"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                            >
                                <Upload name="images" listType="picture" multiple>
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Form.Item>

                            <Form.List name={['attributes', index, 'sizes']}>
                                {(fields, { add, remove }) => (
                                    <div>
                                        {fields.map((field) => (
                                            <Space key={field.key} align="baseline">
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'size']}
                                                    label="Kích thước"
                                                    rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
                                                >
                                                    <Input placeholder="Kích thước" />
                                                </Form.Item>

                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'price']}
                                                    label="Giá"
                                                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                                >
                                                    <Input type="number" placeholder="Giá" />
                                                </Form.Item>

                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'stock']}
                                                    label="Số lượng"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                                                >
                                                    <Input type="number" placeholder="Số lượng" />
                                                </Form.Item>

                                                {fields.length > 1 && (
                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                )}
                                            </Space>
                                        ))}

                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm kích thước
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        </div>
                    ))}

                    <Button type="dashed" onClick={handleAddAttribute} block icon={<PlusOutlined />}>
                        Thêm thuộc tính mới
                    </Button>
                </div>
                <Form.Item
                    name="featured"
                    valuePropName="checked"
                >
                    <Checkbox>Đánh dấu là sản phẩm nổi bật</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProducts;
