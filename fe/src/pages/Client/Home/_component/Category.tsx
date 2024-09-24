import { useProducts } from "@/common/hooks/Products/useProducts"
import { Card } from "antd"
import Meta from "antd/es/card/Meta"
import { Link } from "react-router-dom"
const Category = () => {
    const { data, isLoading } = useProducts()
    return (
        <div className="categories dhn-container">
            <div className="categorie-top flex items-center justify-center">
                <h1 className="text-3xl font-medium">Sản phẩm nổi bật</h1>
            </div>
            {isLoading ? <p>Loading...</p> :
                <div className="mb-4 grid grid-cols-4 gap-4 my-4">
                    {data?.products?.map((product: any) => (
                        (product?.product_featured === true) &&
                        <Link to={`/shops/${product._id}`} key={product._id}>
                            <Card
                                hoverable
                                cover={<img alt={product.product_name} src={product.product_image} />}
                                // actions={[
                                //     <Button key="action1" type="text" icon={<i className="fa fa-heart" />} />,
                                //     <Button key="action2" type="text" icon={<i className="fa fa-shopping-cart" />} />,
                                //     <Button key="action3" type="text" icon={<i className="fa fa-info-circle" />} />,
                                // ]}
                                className="product-card"
                            >
                                <Meta
                                    title={product.product_name}
                                    description={
                                        <>
                                            <p>
                                                {product.product_discount?.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}{' '}
                                                <s className="text-gray-300 ml-3">
                                                    {product.product_price?.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </s>
                                            </p>
                                        </>
                                    }
                                />
                            </Card>
                        </Link>
                    ))}
                </div>}
        </div>
    )
}

export default Category