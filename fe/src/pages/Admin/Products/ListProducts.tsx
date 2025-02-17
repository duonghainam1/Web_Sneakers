import { mutation_Products } from "@/common/hooks/Products/mutation_Products";
import { useProducts } from "@/common/hooks/Products/useProducts";
import { Convert_Color } from "@/configs/Color";
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Space, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ListProducts = () => {
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useProducts(undefined, currenPage, pageSize, '');
    const { mutate, contextHolder } = mutation_Products('DELETE')
    useEffect(() => {
        const params: any = {}
        if (currenPage !== 1) {
            params['page'] = currenPage;
        }
        if (pageSize !== 4) {
            params['pageSize'] = pageSize;
        }
        setSearchParams(params)
    }, [
        currenPage,
        pageSize,
        setSearchParams
    ])
    const dataSource = data?.products?.docs?.map((product: any) => {
        return {
            key: product._id,
            ...product
        }

    });
    const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    const ramdomColor = () => {
        return (
            colors[Math.floor(Math.random() * colors.length)]
        )
    };
    const columns: any = [
        {
            title: (
                <Checkbox
                // checked={isChecked}
                // onChange={handleCheckAll}
                />
            ),
            dataIndex: 'Checkbox',
            className: 'w-[50px]',
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
            className: 'w-[100px]',
            render: (_: any, product: any) => {
                const firstImage = product?.images?.[0];
                if (firstImage) {
                    return <img src={firstImage} alt={product.product_name} className="w-[50px] rounded-full" />
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
                return (
                    <div className="flex gap-2">
                        <Tag color={ramdomColor()}>{minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Tag>-
                        <Tag color={ramdomColor()}>{maxPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Tag>
                    </div>
                );
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
            align: 'center',

            render: (_: any, product: any) => {
                let statusText;
                switch (product?.status) {
                    case 'Available':
                        statusText = 'Còn hàng';
                        break;
                    case 'Out of Stock':
                        statusText = 'Hết hàng';
                        break;
                    case 'Discontinued':
                        statusText = 'Ngừng bán';
                        break;
                    default:
                        statusText = 'Không xác định';
                }
                return <Tag color={ramdomColor()}>{statusText}</Tag>;
            },
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            className: 'w-[130px]',
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
    const list_products_attributes = (product: any) => {
        return (
            <div>
                {product.attributes.map((attribute: any) => {
                    return (
                        <div className="flex gap-11 items-center border-b mb-6 pb-4">
                            <img
                                src={attribute?.images[0]}
                                style={{ objectFit: 'cover' }}
                                alt="Ảnh thuộc tính"
                                className="w-[50px] rounded-full ml-24"
                            />
                            <p className={`w-[30px] h-[30px] rounded-full mr-24 ${Convert_Color(attribute?.color)}`}>

                            </p>
                            <div>
                                {attribute?.sizes.map((size: any) => {
                                    return (
                                        <div className="flex items-center">
                                            <div className="flex gap-4 py-2">
                                                <Tag color={ramdomColor()}>{size.size}</Tag>
                                                -
                                                <Tag color={ramdomColor()}>{size.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Tag>
                                            </div>
                                            <div className="ml-10 flex items-center gap-8 w-[40%]">
                                                <p>Số lượng:</p>
                                                <Tag color={ramdomColor()}>{size.stock}</Tag>
                                            </div>
                                            <div className="ml-[265px] flex items-center gap-8">

                                                <Tag color={ramdomColor()}>{size.stock === 0 ? "Hết hàng" : "Còn hàng"}</Tag>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
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
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    current: currenPage,
                    pageSize: pageSize,
                    total: totalDocs,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    },
                    onShowSizeChange: (current, size) => {
                        setCurrentPage(current);
                        setPageSize(size);
                    }
                }}
                expandable={{
                    expandedRowRender: list_products_attributes,
                }}
                scroll={{ x: 1000 }} />
        </>
    )
}

export default ListProducts