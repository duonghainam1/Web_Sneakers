import { Button, Spin, Table } from 'antd';
import { useProducts } from '@/common/hooks/Products/useProducts';

const List_order_counter = () => {
    const { data, isLoading } = useProducts();
    const dataSource = data?.products?.docs?.map((item: any) => ({
        key: item._id,
        ...item
    }));

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
                            className={`border p-2 `}
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
                                className={`border p-2`}
                            >
                                {size.size}
                            </button>
                        ))
                    )}
                </div>
            )
        },
    ];

    return (
        <>
            {isLoading ? (
                <div className="text-center"><Spin /></div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" />
                    <Button
                        type="primary"
                        className='my-4 py-5'
                    >
                        Thêm vào đơn hàng
                    </Button>
                </div>
            )}
        </>
    );
};

export default List_order_counter;
