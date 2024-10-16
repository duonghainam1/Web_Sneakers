/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/Group 56.svg';
import { useLocalStorage } from '@/common/hooks/useStorage';
import useCart from '@/common/hooks/Cart/useCart';
import Menu_mobile from './Menu_mobile';
import Mini_cart from '@/pages/Client/Cart/_component/Mini_cart';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Search from './Search';

const Header = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const user_data = user?.data?.user;
    const [isOpened, setIsOpened] = useState(false);
    const { data } = useCart(userId);
    let total = 0;
    data?.cart?.map((cart: any) => {
        total += cart.products.length;
    })
    const handleOpen = () => {
        setIsOpened(!isOpened);
    }
    return (
        <>
            <header className="px-4 pt-2 fixed top-0 left-0 right-0 bg-white h-20 z-50">
                <nav className="flex flex-row lg:flex-nowrap justify-between items-center py-2">
                    <div className="lg:basis-2/6 lg:ml-12 flex items-center gap-4">
                        <div className='lg:hidden'>
                            <Menu_mobile user_data={user_data} userId={userId} />
                        </div>
                        <Link to={`/`}>
                            <img src={logo} alt="Logo" className="logo__img w-16 lg:w-24 " />
                        </Link>
                    </div>

                    <div className="lg:basis-3/6 hidden lg:block">
                        <ul className="flex gap-8 ">
                            <li className="dhn-menu"><Link to={`/`}>Trang chủ</Link></li>
                            <li className="dhn-menu relative group">
                                <Link to={`/shops`} className="flex gap-1 items-center">Sản phẩm
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 font-semibold">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                            <li className="dhn-menu"><a href="#">Liên hệ</a></li>
                            <li className="dhn-menu"><a href="#">Giới thiệu</a></li>
                        </ul>
                    </div>
                    <div className="lg:basis-1/6 flex gap-5 items-center ml-16 mr-0 lg:mr-12 justify-end">
                        <ul className="flex gap-3">
                            <li>
                                <SearchOutlined style={{ fontSize: '24px' }} onClick={handleOpen} />
                            </li>
                            <li>
                                <a href="#">
                                    <HeartOutlined style={{ fontSize: '24px' }} />
                                </a>
                            </li>
                            <li>
                                <Link to={`/cart`} className='relative mr-4 lg:mr-0 hidden lg:block'>
                                    <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                    <span className='absolute -top-2 -right-3 bg-red-400 rounded-full px-[5px] text-white text-center'>{total}</span>
                                </Link>
                                <div className='lg:hidden'>
                                    <Mini_cart />
                                </div>
                            </li>
                        </ul>
                        {userId ? (
                            <div className="relative hidden lg:block">
                                <Link to={`/profile`} className="flex items-center gap-2">
                                    <img
                                        src={user_data.avatar}
                                        alt="User Avatar"
                                        className="w-9 h-9 rounded-full cursor-pointer"
                                    />
                                </Link>
                            </div>
                        ) : (
                            <Link to="/signin" className="bg-black text-white p-2 text-sm rounded">Đăng nhập</Link>
                        )}
                    </div>
                </nav>
                {isOpened && <Search />}
            </header>

        </>
    );
};

export default Header;
