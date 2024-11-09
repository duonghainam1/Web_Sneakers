/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutation_Category } from "@/common/hooks/Category/mutation_Category";
import { useCategory } from "@/common/hooks/Category/useCategory";
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Popconfirm, Space, Spin, Table } from "antd";
import { Link } from "react-router-dom";

const ListCategory = () => {
    const { data, isLoading } = useCategory()
    const { mutate, contextHolder } = mutation_Category('DELETE')
    const dataSource = data?.map((category: any) => {
        return {
            key: category?._id,
            ...category
        }
    })
    const columns: any = [
        {
            title: 'Ảnh danh mục',
            dataIndex: 'category_image',
            key: 'category_image',
            width: 200,
            render: (_: any, category: any) => (
                <img src={category?.category_image} alt={category?.category_name} className="rounded-full w-[50px]" />
            )
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'category_name',
            key: 'category_name',
        },

        {
            title: 'Thao tác',
            dataIndex: 'action',
            fixed: 'right',
            className: 'w-[100px]',
            render: (_: any, category: any) => (
                <Space>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => mutate(category?._id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ fontSize: "20px" }} />
                    </Popconfirm>

                    <Link to={`/admin/categori/${category._id}`}>
                        <EditOutlined style={{ fontSize: "20px" }} />
                    </Link>
                </Space>
            )
        },
    ];
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-lg lg:text-2xl">Danh sách danh mục</h1>
                <Link to="/admin/categori/add">
                    <Button type="primary" icon={<PlusCircleFilled />}>
                        Thêm
                    </Button>
                </Link>
            </div>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} />
        </>
    )
}

export default ListCategory