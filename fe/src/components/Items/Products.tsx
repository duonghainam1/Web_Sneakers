import { useProducts } from "@/common/hooks/Products/useProducts";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

const Products = () => {
    const { data, isLoading } = useProducts();
    const findMinMaxPrices = (attributes: any) => {
        let minPrice = Infinity;
        let maxPrice = -Infinity;

        attributes.forEach((attr: any) => {
            attr.sizes.forEach((size: any) => {
                if (size.price < minPrice) minPrice = size.price;
                if (size.price > maxPrice) maxPrice = size.price;
            });
        });

        return {
            minPrice: minPrice === Infinity ? 0 : minPrice,
            maxPrice: maxPrice === -Infinity ? 0 : maxPrice
        };
    };

    return (
        isLoading ? "Loading..." :
            <>
                {data?.products?.map((product: any) => {
                    const firstImage = product.images?.[0];
                    const { minPrice, maxPrice } = findMinMaxPrices(product.attributes);
                    return (
                        <Link to={`/shops/${product._id}`} key={product._id}>
                            <Card
                                hoverable
                                cover={<img alt={product?.name} src={firstImage} />}
                                className="product-card"
                            >
                                <Meta
                                    title={product?.name}
                                    description={
                                        <div className="flex gap-1">
                                            <p>
                                                {minPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                            </p>
                                            -
                                            <p>
                                                {maxPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                            </p>
                                        </div>
                                    }
                                />
                            </Card>
                        </Link>
                    );
                })}
            </>
    );
};

export default Products;
