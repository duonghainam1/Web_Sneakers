import { mutation_Category } from "@/common/hooks/Category/mutation_Category";
import { useCategory } from "@/common/hooks/Category/useCategory";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
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
    const columns = [
        {
            title: 'Ảnh danh mục',
            dataIndex: 'category_image',
            key: 'category_image',
            render: (_: any, category: any) => (
                <img src={category?.category_image} alt={category?.category_name} style={{ width: 100 }} />
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
                        <Button danger className="mr-2">Xóa</Button>
                    </Popconfirm>

                    <Link to={`/admin/categori/${category._id}`}>
                        <Button type="primary">Sửa</Button>
                    </Link>
                </Space>
            )
        },
    ];
    if (isLoading) return <p>Loading...</p>
    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Danh sách danh mục</h1>
                <Link to="/admin/categori/add">
                    <Button type="primary" icon={<PlusCircleFilled />}>
                        Thêm
                    </Button>
                </Link>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default ListCategory