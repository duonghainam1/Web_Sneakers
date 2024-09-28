import Products_Item from "@/components/Items/Products"
import Fillter_Menu from "./Fillter_Menu"
const Products = () => {
    return (
        <div className="basis-4/5">
            <div className="mb-3 flex justify-between items-center">
                <div className="flex gap-4 lg:hidden">
                    <Fillter_Menu />
                    <p>Products</p>
                </div>
                <p className="hidden lg:block">Products</p>
                <div className="flex gap-1 items-center">
                    <p>Shot by latest</p>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Products_Item />
            </div>

        </div>
    )
}

export default Products