import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/Group 56.svg';
import { useLocalStorage } from '@/common/hooks/useStorage';
import useCart from '@/common/hooks/Cart/useCart';

const Header = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const userAvatar = user?.data?.user?.avatar;
    const { data } = useCart(userId);
    let total = 0;
    data?.cart?.map((cart: any) => {
        total += cart.products.length;
    })

    return (
        <header className="py-4">
            <nav className="flex flex-row justify-center items-center py-2">
                <div className="logo basis-2/6 ml-12">
                    <Link to={`/`}>
                        <img src={logo} alt="Logo" className="logo__img w-24" />
                    </Link>
                </div>
                <div className="menu basis-3/6">
                    <ul className="flex gap-8">
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
                <div className="header-right basis-1/6 flex gap-5 items-center ml-8 mr-12 justify-end">
                    <ul className="flex gap-3">
                        <li>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <Link to={`/cart`} className='flex relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className='absolute -top-2 -right-3 bg-red-400 rounded-full px-[5px] text-white text-center'>{total}</span>
                            </Link>
                        </li>
                    </ul>
                    {userId ? (
                        <div className="relative">
                            <Link to={`/profile`} className="flex items-center gap-2">
                                <img
                                    src={userAvatar} // Thay thế bằng URL mặc định nếu không có avatar
                                    alt="User Avatar"
                                    className="w-9 h-9 rounded-full cursor-pointer"
                                    onClick={() => { /* Handle avatar click, e.g., navigate to profile */ }}
                                />
                            </Link>
                        </div>
                    ) : (
                        <Link to="/signin" className="bg-black text-white p-2 text-sm rounded">Đăng nhập</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
