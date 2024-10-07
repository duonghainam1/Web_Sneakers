import { Button, Spin, Table, message } from 'antd';
import { useState } from 'react';
import { useProducts } from '@/common/hooks/Products/useProducts';

const List_order_counter = ({ onSelectProduct }: any) => {
    const { data, isLoading } = useProducts();
    const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: { color?: string; size?: string } }>({});

    const handleSelectAttribute = (productId: string, key: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [key]: value
            }
        }));
    };

    const handleAddToOrder = (product: any) => {
        const selected = selectedAttributes[product._id];
        if (!selected || !selected.color || !selected.size) {
            message.warning("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng!");
            return;
        }
        onSelectProduct({ ...product, selected });
    };

    const dataSource = data?.products?.docs?.map((item: any) => {
        return {
            key: item._id,
            ...item
        };
    });

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            render: (_: any, product: any) => {
                const firstImage = product?.images?.[0];
                if (firstImage) {
                    return <img src={firstImage} alt={product.product_name} style={{ width: "100px" }} />;
                }
                return null;
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, product: any) => (
                <div>
                    {product?.name?.length > 50 ? `${product?.name.substring(0, 50)}...` : product?.name}
                </div>
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
                    attribute.sizes.forEach((size: any) => {
                        if (size.price < minPrice) {
                            minPrice = size.price;
                        }
                        if (size.price > maxPrice) {
                            maxPrice = size.price;
                        }
                    });
                });
                return `${minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} - ${maxPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
            }
        },
        {
            title: 'Màu sắc',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, product: any) => (
                <div className="flex space-x-2">
                    {product.attributes.map((item: any) => (
                        <button
                            key={item.color}
                            className={`border p-2 ${selectedAttributes[product._id]?.color === item.color ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleSelectAttribute(product._id, 'color', item.color)}
                        >
                            {item.color}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Kích thước',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, product: any) => (
                <div className="flex space-x-2">
                    {product.attributes.map((item: any) =>
                        item.sizes.map((size: any) => (
                            <button
                                key={size.size}
                                className={`border p-2 ${selectedAttributes[product._id]?.size === size.size ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => handleSelectAttribute(product._id, 'size', size.size)}
                            >
                                {size.size}
                            </button>
                        ))
                    )}
                </div>
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, product: any) => (
                <Button type="primary" onClick={() => handleAddToOrder(product)}>
                    Thêm vào đơn hàng
                </Button>
            )
        }
    ];

    return (
        <>
            {isLoading ? (
                <div className="text-center"><Spin /></div>
            ) : (
                <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="id" />
            )}
        </>
    );
};

export default List_order_counter;
