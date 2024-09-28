import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Space } from 'antd'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu_mobile = ({ userId, user_data }: any) => {
    console.log(userId, user_data);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <>
                <Space>
                    <MenuOutlined style={{ fontSize: '24px' }} onClick={showDrawer} />
                </Space>
                <Drawer
                    title="Menu"
                    placement={'left'}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={'left'}
                    width={240}
                >
                    <div className="lg:basis-3/6">
                        <ul className="flex-row *:py-2">
                            <li className="*:text-black font-bold border-b-2"><Link to={`/`}>Trang chủ</Link></li>
                            <li className="*:text-black font-bold border-b-2 relative group">
                                <Link to={`/shops`} className="flex gap-1 items-center">Sản phẩm</Link>
                            </li>
                            <li className="*:text-black font-bold border-b-2"><a href="#">Liên hệ</a></li>
                            <li className="*:text-black font-bold border-b-2"><a href="#">Giới thiệu</a></li>
                            {userId ? (
                                <div className="relative lg:hidden">
                                    <Link to={`/profile`} className="flex items-center gap-2">
                                        <img
                                            src={user_data?.avatar}
                                            alt="User Avatar"
                                            className="w-9 h-9 rounded-full cursor-pointer"
                                        />
                                        <p className='text-black font-bold'>{user_data?.name}</p>
                                    </Link>

                                </div>
                            ) : (
                                <Link to="/signin" className="bg-black text-white p-2 text-sm rounded">Đăng nhập</Link>
                            )}
                        </ul>
                    </div>


                </Drawer>
            </>
        </div>
    )
}

export default Menu_mobile