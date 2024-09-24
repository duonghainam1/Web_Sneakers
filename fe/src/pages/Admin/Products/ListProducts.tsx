import { mutation_Products } from "@/common/hooks/Products/mutation_Products";
import { useProducts } from "@/common/hooks/Products/useProducts";
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";

const ListProducts = () => {
    const { data, isLoading } = useProducts()
    console.log(data);

    const { mutate, contextHolder } = mutation_Products('DELETE')
    const dataSource = data?.products?.map((product: any) => {
        return {
            key: product._id,
            ...product
        }

    });
    const columns = [
        {
            title: (
                <Checkbox
                // checked={isChecked}
                // onChange={handleCheckAll}
                />
            ),
            dataIndex: 'Checkbox',
            render: (_: any, product: any) => (
                <Checkbox
                    // checked={isChecked}
                    onChange={() => console.log(`Checked ${product.key}`)}
                />
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'images',
            render: (_: any, product: any) => {
                const firstImage = product?.images?.[0];
                if (firstImage) {
                    return <img src={firstImage} alt={product.product_name} style={{ width: "100px" }} />
                }
                return null;
            }
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (_: any, product: any) => (
                <Space>
                    <div className="">
                        {product?.name?.length > 50 ? `${product?.name.substring(0, 50)}...` : product?.name}
                    </div>
                </Space>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (_: any, product: any) => {
                if (!product.attributes || product.attributes.length === 0) {
                    return 'N/A';
                }
                let minPrice = Infinity;
                let maxPrice = -Infinity;
                product.attributes.forEach((attribute: any) => {
                    if (attribute.sizes && attribute.sizes.length > 0) {
                        attribute.sizes.forEach((size: any) => {
                            if (size.price < minPrice) {
                                minPrice = size.price;
                            }
                            if (size.price > maxPrice) {
                                maxPrice = size.price;
                            }
                        });
                    }
                });
                if (minPrice === Infinity || maxPrice === -Infinity) {
                    return 'N/A';
                }
                return `${minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} - ${maxPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
            }
        },

        {
            title: 'Mô Tả',
            dataIndex: 'description',
            render: (_: any, product: any) => (
                <Space>
                    <div>
                        {product?.description?.length > 80 ? `${product?.description.substring(0, 80)}...` : product?.description}
                    </div>
                </Space>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_: any, product: any) => {
                let color;
                let statusText;
                switch (product?.status) {
                    case 'Available':
                        color = 'green';
                        statusText = 'Còn hàng';
                        break;
                    case 'Out of Stock':
                        color = 'red';
                        statusText = 'Hết hàng';
                        break;
                    case 'Discontinued':
                        color = 'gray';
                        statusText = 'Ngừng bán';
                        break;
                    default:
                        color = 'default';
                        statusText = 'Không xác định';
                }
                return <Tag color={color}>{statusText}</Tag>;
            },
        },
        {
            title: '',
            dataIndex: 'action',
            render: (_: any, product: any) => (
                <Space>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                        onConfirm={() => mutate(product.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ fontSize: "20px" }} />
                    </Popconfirm>

                    <Link to={`/admin/products/${product.key}`}>
                        <EditOutlined style={{ fontSize: "20px" }} />
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
                <h1 className="font-bold text-2xl">Danh sách sản phẩm</h1>
                <Link to="/admin/products/add">
                    <Button type="primary" icon={<PlusCircleFilled />}>
                        Thêm
                    </Button>
                </Link>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default ListProducts