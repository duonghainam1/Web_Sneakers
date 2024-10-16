/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutatioinCart } from '@/common/hooks/Cart/mutationCart';
import useCart from '@/common/hooks/Cart/useCart';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Checkbox, Drawer, Empty, message, Space, Spin } from 'antd'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Mini_cart = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data, isLoading } = useCart(userId);
    const { mutate: deleteProduct } = mutatioinCart('DELETE');
    const navi = useNavigate();
    const { mutate: updateStatus } = mutatioinCart('UPDATE_STATUS');
    let total = 0;
    data?.cart?.map((cart: any) => {
        total += cart.products.length;
    })

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleSelectProduct = (product: any, checked: boolean) => {
        const updatedProduct = {
            userId,
            cartId: product.cartId,
            productId: product.productId,
            color: product.color,
            size: product.size,
            status_checked: checked,
        };
        updateStatus(updatedProduct);
    };
    const handleDeleteProduct = (product: any) => {
        const productData = {
            userId,
            productId: product.productId,
            size: product.size,
            color: product.color,
        };

        deleteProduct(productData);
    }
    const totalSelectedPrice = data?.cart?.reduce((total: number, product: any) => {
        const productTotal = product?.products?.reduce((subTotal: number, item: any) => {
            if (item?.status_checked) {
                return subTotal + (item.quantity * item.total_price_item);
            }
            return subTotal;
        }, 0);
        return total + productTotal;
    }, 0);


    const handleProceedToCheckout = () => {
        const selectedForPayment = data?.cart?.filter((product: any) => {
            return product?.products?.some((item: any) => item?.status_checked);
        });
        if (selectedForPayment?.length === 0) {
            message.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }
        onClose();
        navi(`/orders`);
    };
    const truncate = (text: string, maxLength: number) => {
        if (text?.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    if (isLoading) return <Spin />
    return (
        <>
            <Space>
                <div className='flex relative mr-4 lg:mr-0' onClick={showDrawer}>
                    <ShoppingCartOutlined style={{ fontSize: '24px' }} onClick={showDrawer} />
                    <span className='absolute -top-2 -right-3 bg-red-400 rounded-full px-[5px] text-white text-center'>{total}</span>
                </div>
            </Space>
            <Drawer
                title="Giỏ hàng của bạn"
                placement={'right'}
                closable={false}
                onClose={onClose}
                open={open}
                key={'right'}
                width={380}
            >{data?.cart?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                {data?.cart?.map((cart: any) => {
                    return cart?.products?.map((product: any) => {
                        return (
                            <div className="space-y-2 border-b pb-4 mb-4">
                                <div className="flex items-center justify-between pb-2">
                                    <div className="flex items-center space-x-4">
                                        <Checkbox
                                            checked={product?.status_checked}
                                            onChange={(e) => handleSelectProduct(product, e.target.checked)}
                                        />
                                        <img src={product?.productId?.images[0]} alt="Product Image" className="w-20 h-20 object-cover rounded-md" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{truncate(product?.productId?.name, 30)}</p>
                                            <p className="text-sm text-gray-500">{product?.color} - {product.size}</p>
                                            <p className="text-sm text-gray-500">{product?.total_price_item?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} X {product?.quantity}</p>
                                            <p className="font-semibold text-lg">{cart?.total_price_item}</p>
                                        </div>
                                    </div>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDeleteProduct(product)}><DeleteOutlined style={{ fontSize: '20px' }} /></button>
                                </div>
                                <div className="flex items-center justify-end space-x-2 mt-2">
                                    <Button className="bg-gray-200 hover:bg-gray-300 rounded">-</Button>
                                    <input
                                        type="number"
                                        placeholder="1"
                                        className="w-14 h-8 text-center border rounded focus:outline-none "
                                        min="1"
                                    />
                                    <Button className="bg-gray-200 hover:bg-gray-300 rounded">+</Button>
                                </div>
                            </div>
                        )
                    })
                })}

                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between font-semibold">
                        <p>Tổng cộng:</p>
                        <p className="text-lg">{totalSelectedPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition duration-300" onClick={handleProceedToCheckout}>Thanh toán</button>
                </div>

            </Drawer>
        </>
    )


};

export default Mini_cart;
