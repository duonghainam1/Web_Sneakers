/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, InputNumber, message, Spin, Table } from 'antd';
import { useState } from 'react';
import { useProducts } from '@/common/hooks/Products/useProducts';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const List_order_counter = ({ handle_pay, handleClose }: any) => {
    const { data, isLoading } = useProducts();
    const [selectedAttributes, setSelectedAttributes] = useState<any>({});
    const [cart, setCart] = useState<any[]>([]);
    const dataSource = data?.products?.docs?.map((item: any) => ({
        key: item._id,
        ...item
    }));

    const handleAddCart = (product: any) => {
        const selectedProduct = selectedAttributes[product._id];
        if (!selectedProduct || !selectedProduct.color || !selectedProduct.size) {
            message.error("Vui lòng chọn màu sắc và kích thước.");
            return;
        }
        const isAlreadyInCart = cart.some((item) => item.productId === product._id);
        if (isAlreadyInCart) {
            message.error("Sản phẩm đã có trong giỏ hàng.");
            return;
        }
        const quantity = selectedProduct.quantity || 1;
        const productToAdd = {
            productId: product._id,
            name: product.name,
            price: product.attributes.map((item: any) => item.sizes.find((size: any) => size.size === selectedProduct.size)?.price).reduce((a: any, b: any) => a + b, 0),
            color: selectedProduct.color,
            size: selectedProduct.size,
            images: product.images,
            quantity: quantity
        };
        setCart((prevCart) => [...prevCart, productToAdd]);
    };

    const handleRemoveFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
        setSelectedAttributes((prevState: any) => {
            const newState = { ...prevState };
            delete newState[productId];
            return newState;
        });
    };

    const handleColorSelect = (productId: string, color: string) => {
        setSelectedAttributes((prev: any) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                color: prev[productId]?.color === color ? undefined : color,
                size: undefined
            }
        }));
    };

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedAttributes((prev: any) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                size: prev[productId]?.size === size ? undefined : size
            }
        }));
    };

    const handlePayment = () => {
        handleClose()
        handle_pay(cart);
        setCart([]);
        setSelectedAttributes({});
    };
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
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
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
                return (
                    <div>
                        {product?.name?.length > 50 ? `${product?.name.substring(0, 50)}...` : product?.name}
                    </div>
                )

            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
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
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
                return (
                    <div className="flex space-x-2">
                        {product.attributes.map((item: any) => (
                            <button
                                key={item.color}
                                className={`border p-2 ${selectedAttributes[product._id]?.color === item.color ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleColorSelect(product._id, item.color)}
                            >
                                {item.color}
                            </button>
                        ))}
                    </div>
                )
            }
        },

        // Cột hiển thị kích thước
        {
            title: 'Kích thước',
            render: (_: any, product: any) => {
                const selectedColor = selectedAttributes[product._id]?.color;
                if (product.status === 'Out of Stock' || !selectedColor) {
                    return null;
                }

                const selectedColorAttributes = product.attributes.find((attr: any) => attr.color === selectedColor);

                return (
                    <div className="flex space-x-2">
                        {selectedColorAttributes?.sizes.map((size: any) => (
                            <button
                                key={size.size}
                                className={`border p-2 ${selectedAttributes[product._id]?.size === size.size ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleSizeSelect(product._id, size.size)}
                            >
                                {size.size}
                            </button>
                        ))}
                    </div>
                );
            }
        },
        {
            title: 'Số lượng',
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
                const selectedProduct = selectedAttributes[product._id];
                const selectedSize = selectedProduct ? selectedProduct.size : null;

                if (!selectedSize) {
                    return;
                }

                const availableStock = product.attributes
                    .map((attr: any) => attr.sizes.find((size: any) => size.size === selectedSize)?.stock || 0)
                    .reduce((a: any, b: any) => a + b, 0);

                return (
                    <div className="flex space-x-2">
                        <InputNumber
                            min={1}
                            max={availableStock}
                            value={selectedProduct?.quantity || 1}
                            onChange={(value) => {
                                setSelectedAttributes((prevState: any) => ({
                                    ...prevState,
                                    [product._id]: {
                                        ...prevState[product._id],
                                        quantity: value
                                    }
                                }));
                            }}
                        />
                        {/* <span>Kho: {availableStock}</span> */}
                    </div>
                );
            }
        },

        {
            title: 'Hành động',
            render: (_: any, product: any) => {
                if (product.status === 'Out of Stock') {
                    return null;
                }
                const isProductInCart = cart.some((item) => item.productId === product._id);
                return (
                    <div>
                        {isProductInCart ? (
                            <Button danger onClick={() => handleRemoveFromCart(product._id)}>
                                <DeleteOutlined />
                            </Button>
                        ) : (
                            <Button type="primary" onClick={() => handleAddCart(product)}>
                                <PlusOutlined />
                            </Button>
                        )}
                    </div>
                );
            }
        }
    ];

    return (
        <>
            {isLoading ? (
                <div className="text-center"><Spin /></div>
            ) : (
                <div className='flex flex-col justify-center items-center'>

                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" scroll={{ x: 1000 }} />
                    <div className="my-4">
                        {cart?.length > 0 && (
                            <Button
                                type="primary"
                                onClick={handlePayment}
                            >
                                Thanh toán ({cart.length} sản phẩm)
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default List_order_counter;
