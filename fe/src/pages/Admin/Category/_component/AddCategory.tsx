import { mutation_Category } from "@/common/hooks/Category/mutation_Category";
import { uploadFileCloudinary } from "@/common/lib/utils";
import { LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, Upload } from "antd"
import { useState } from "react";
import { Link } from "react-router-dom";
type FieldType = {
    category_name?: string;
    category_image?: number;
};


const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const { mutate, contextHolder } = mutation_Category('ADD')
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate({ ...values, category_image: imageUrl });
    };
    const handleUpload = async ({ file }: any) => {
        setLoading(true);
        const url = await uploadFileCloudinary(file);
        setImageUrl(url);
        setLoading(false);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-10 relative">
                <Link to="/admin/categori" className="flex items-center gap-2 text-[#1B7EE2]">
                    <LeftOutlined />
                    <span>Quay lại</span>
                </Link>
                <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">Thêm danh mục</h1>

            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên danh mục"
                    name="category_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input className="w-full" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Ảnh danh mục"
                    name="category_image"
                    rules={[{ required: true, message: 'Vui lòng tải lên ảnh danh mục!' }]}
                >
                    <Upload
                        name="category_image"
                        listType="picture-card"
                        // className="avatar-uploader w-full"
                        showUploadList={false}
                        customRequest={handleUpload}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item className="text-center mt-6">
                    <Button type="primary" htmlType="submit" className="w-40">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddCategory