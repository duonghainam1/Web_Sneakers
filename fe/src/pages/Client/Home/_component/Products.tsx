import Products_Item from "@/components/Items/Products"

const Products = () => {
    return (
        <div className="our-bestseller lg:mx-28">
            <h1 className="text-3xl font-medium text-center">Sản phẩm</h1>
            <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                <Products_Item />
            </div>

        </div>
    )
}

export default Products