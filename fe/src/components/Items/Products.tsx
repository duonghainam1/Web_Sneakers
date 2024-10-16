/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Empty } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import Skeleton_item from "../Skeleton/Skeleton";
import ScrollTop from "../layouts/ScrollTop";
import { Products_Type } from "@/common/types/products";

const Products = ({ products, isLoading }: any) => {
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

        <>
            {products?.products?.docs?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {isLoading ? (
                <Skeleton_item />
            ) : (
                <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                    {products?.products?.docs?.map((product: Products_Type) => {
                        const firstImage = product.images?.[0];
                        const { minPrice, maxPrice } = findMinMaxPrices(product.attributes);
                        return (
                            <>
                                {product.status === "Out of Stock" ? (
                                    ''
                                ) : (
                                    <Link to={`/shops/${product._id}`} key={product._id}
                                        onClick={ScrollTop}>
                                        <Card
                                            hoverable
                                            cover={
                                                <div className="w-full h-72 overflow-hidden flex items-center justify-center">
                                                    <img
                                                        alt={product?.name}
                                                        src={firstImage}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            }
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
                                )}

                            </>

                        );
                    })}
                </div>

            )}
        </>
    );
};

export default Products;
