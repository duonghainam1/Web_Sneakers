import logo from '../../../assets/icons/kit.png'
import visa from '../../../assets/icons/visa.jpeg'
import Gpay from '../../../assets/icons/G pay.png'

const Footer = () => {
    return (
        <footer className=" bg-black text-white py-4 lg:py-12">
            <div className="lg:container mx-auto px-4 md:px-12">
                {/* Logo and Contact */}
                <div className="flex flex-col lg:flex-row justify-between border-b border-gray-600 pb-4 lg:pb-8 mb-4 lg:mb-8 gap-8">
                    <div className="flex-1">
                        <a href="/" className="block mb-6">
                            <img src={logo} alt="Logo" className="w-32" />
                        </a>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <i className="fa-solid fa-phone mr-3"></i>
                                <p>0357219736</p>
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-envelope mr-3"></i>
                                <p>duonghainam03012004@gmail.com</p>
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-location-dot mr-3"></i>
                                <p>Lạng Sơn</p>
                            </li>
                        </ul>
                    </div>

                    {/* Information and Service Links */}
                    <div className="flex-1 flex justify-between lg:flex-row gap-8">
                        {/* Information Links */}
                        <div className="flex-1">
                            <p className="font-medium mb-4">Information</p>
                            <ul className="space-y-3">
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">Login</a></li>
                                <li><a href="#">My Cart</a></li>
                                <li><a href="#">My Wishlist</a></li>
                                <li><a href="#">Checkout</a></li>
                            </ul>
                        </div>

                        {/* Service Links */}
                        <div className="flex-1">
                            <p className="font-medium mb-4">Service</p>
                            <ul className="space-y-3">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">My Cart</a></li>
                                <li><a href="#">My Wishlist</a></li>
                                <li><a href="#">Checkout</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Subscribe */}
                    <div className="flex-1">
                        <p className="font-medium mb-4">Subscribe</p>
                        <p className="mb-4">Subscribe to our newsletter to receive the latest news and updates.</p>
                        <form className="flex gap-2 border border-gray-500 rounded-md p-2">
                            <input type="email" placeholder="Your Email" className="flex-grow bg-transparent outline-none text-white px-2" />
                            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md">Send</button>
                        </form>
                    </div>
                </div>

                {/* Payment Methods and Social Icons */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4">
                        <img src={visa} alt="Visa" className="w-12 h-8 object-contain" />
                        <img src={Gpay} alt="GPay" className="w-12 h-8 object-contain" />
                    </div>
                    <p className="text-sm text-center lg:text-left">&copy; 2023 Krist. All Rights Reserved.</p>
                    <div className="flex gap-4 text-xl">
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
