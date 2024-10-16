/* eslint-disable @typescript-eslint/no-explicit-any */
import { Products_Type } from "@/common/types/products";
import ScrollTop from "@/components/layouts/ScrollTop";
import Skeleton_item from "@/components/Skeleton/Skeleton";
import { Card, Empty } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

const Relater_Products = ({ data_Detail, isLoading }: any) => {
    const findMinMaxPrices = (attributes: any) => {
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        attributes?.forEach((attr: any) => {
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
        <div className="our-bestseller lg:mx-28 my-12">
            <h1 className="text-3xl font-medium">Sản phẩm cùng loại</h1>
            {data_Detail?.relatedProducts?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {isLoading ? (
                <Skeleton_item />
            ) : (
                <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                    {data_Detail?.relatedProducts?.map((product: Products_Type) => {
                        const firstImage = product.images?.[0];
                        const { minPrice, maxPrice } = findMinMaxPrices(product?.attributes);
                        return (
                            <>
                                {product?.status === "Out of Stock" ? ('') : (
                                    <Link to={`/shops/${product?._id}`} key={product?._id}
                                        onClick={ScrollTop}>
                                        <Card
                                            hoverable
                                            cover={
                                                <div className="w-full h-72 lg:h-96 overflow-hidden flex items-center justify-center">
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
                                                            {minPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                        </p>
                                                        -
                                                        <p>
                                                            {maxPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
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



        </div>
    )
}

export default Relater_Products