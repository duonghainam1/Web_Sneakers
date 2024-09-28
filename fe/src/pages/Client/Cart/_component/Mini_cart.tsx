import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Checkbox, Drawer, Space } from 'antd'
import { useState } from 'react';
const Mini_cart = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Space>
                <div className='flex relative mr-4 lg:mr-0' onClick={showDrawer}>
                    <ShoppingCartOutlined style={{ fontSize: '24px' }} onClick={showDrawer} />
                    <span className='absolute -top-2 -right-3 bg-red-400 rounded-full px-[5px] text-white text-center'>0</span>
                </div>
            </Space>
            <Drawer
                title="Giỏ hàng của bạn"
                placement={'right'}
                closable={false}
                onClose={onClose}
                open={open}
                key={'right'}
                width={400}
            >
                <div className="space-y-2 border-b pb-4 mb-4">
                    <div className="flex items-center justify-between pb-2">
                        <div className="flex items-center space-x-4">
                            <Checkbox></Checkbox>
                            <img src="https://via.placeholder.com/50" alt="Product Image" className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                                <p className="font-semibold">Tên sản phẩm 1</p>
                                <p className="text-sm text-gray-500">Trắng - 40</p>
                                <p className="text-sm text-gray-500">Số lượng: 1</p>
                                <p className="font-semibold text-lg">500,000₫</p>
                            </div>
                        </div>
                        <button className="text-red-500 hover:underline"><DeleteOutlined style={{ fontSize: '20px' }} /></button>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-2">
                        <Button className="bg-gray-200 hover:bg-gray-300 rounded">-</Button>
                        <input
                            type="number"
                            placeholder="1"
                            className="w-14 h-8 text-center border rounded focus:outline-none "
                            min="1"
                        />
                        <Button className="bg-gray-200 hover:bg-gray-300 rounded">+</Button>                    </div>
                </div>
                <div className="space-y-2 border-b pb-4 mb-4">
                    <div className="flex items-center justify-between pb-2">
                        <div className="flex items-center space-x-4">
                            <Checkbox></Checkbox>
                            <img src="https://via.placeholder.com/50" alt="Product Image" className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                                <p className="font-semibold">Tên sản phẩm 1</p>
                                <p className="text-sm text-gray-500">Trắng - 40</p>
                                <p className="text-sm text-gray-500">Số lượng: 1</p>
                                <p className="font-semibold text-lg">500,000₫</p>
                            </div>
                        </div>
                        <button className="text-red-500 hover:underline"><DeleteOutlined style={{ fontSize: '20px' }} /></button>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-2">
                        <Button className="bg-gray-200 hover:bg-gray-300 rounded">-</Button>
                        <input
                            type="number"
                            placeholder="1"
                            className="w-14 h-8 text-center border rounded focus:outline-none "
                            min="1"
                        />
                        <Button className="bg-gray-200 hover:bg-gray-300 rounded">+</Button>                    </div>
                </div>
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between font-semibold">
                        <p>Tổng cộng:</p>
                        <p className="text-lg">1,500,000₫</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition duration-300">Thanh toán</button>
                </div>

            </Drawer>
        </>
    )


};

export default Mini_cart;
