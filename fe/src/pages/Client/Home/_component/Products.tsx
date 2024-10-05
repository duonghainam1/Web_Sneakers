import { useProducts } from "@/common/hooks/Products/useProducts";
import Products_Item from "@/components/Items/Products"

const Products = () => {
    const { data, isLoading, } = useProducts();
    return (
        <div className="our-bestseller lg:mx-28 my-11">
            <h1 className="text-3xl font-medium text-center">Sản phẩm</h1>
            <Products_Item products={data} isLoading={isLoading} />
        </div>
    )
}

export default Products