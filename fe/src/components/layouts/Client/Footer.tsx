import logo from '../../../assets/icons/kit.png'
import visa from '../../../assets/icons/visa.jpeg'
import Gpay from '../../../assets/icons/G pay.png'
const Footer = () => {
    return (
        <footer className="bg-black">
            <div className="dhn-container  text-white">
                <div className="flex border-b border-gray-400 pb-12 gap-4">
                    <div className="basis-2/5">
                        <a href="index.html">
                            <img src={logo} alt="" className="logo__img w-24 mb-7" />
                        </a>
                        <ul className="leading-8">
                            <li>
                                <a href="#" className="flex gap-4">
                                    <span><i className="fa-solid fa-phone" /></span>
                                    <p>0357219736</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex gap-4">
                                    <span><i className="fa-solid fa-envelope" /></span>
                                    <p>duonghainam03012004@gmail.com</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex gap-4">
                                    <span><i className="fa-solid fa-location-dot" /></span>
                                    <p> Lạng Sơn</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="basis-1/5">
                        <p className="font-medium pb-3">Information</p>
                        <ul className="leading-8">
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Login</a></li>
                            <li><a href="#">My Cart</a></li>
                            <li><a href="#">My Wishlist</a></li>
                            <li><a href="#">Checkout</a></li>
                        </ul>
                    </div>
                    <div className="basis-1/5">
                        <p className="font-medium pb-3">Serivce</p>
                        <ul className="leading-8">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">My Cart</a></li>
                            <li><a href="#">My Wishlist</a></li>
                            <li><a href="#">Checkout</a></li>
                        </ul>
                    </div>
                    <div className="basis-1/5">
                        <p className="font-medium pb-3">Subsribe</p>
                        <p>Lorem ipsum dolor sit, amet consectetur </p>
                        <form className="flex gap-4 border-2 border-gray-200 p-3 rounded-xl mt-4">
                            <span><i className="fa-solid fa-envelope dhn-icons" /></span>
                            <input type="text" placeholder="  Your Email" className="outline-none bg-transparent text-white border-none" />
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </span>
                        </form>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center w-10 *:border">
                        <img src={visa} className="p-2" alt="" />
                        <img src={Gpay} className="p-2" alt="" />
                        <img src={visa} className="p-2" alt="" />
                        <img src={Gpay} className="p-2" alt="" />
                    </div>
                    <div>
                        <p>2023 Krist All Rights are reserved</p>
                    </div>
                    <div className="flex gap-5">
                        <span><i className="fa-brands fa-facebook text-xl" /></span>
                        <span><i className="fa-brands fa-instagram text-xl" /></span>
                        <span><i className="fa-brands fa-twitter text-xl" /></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer