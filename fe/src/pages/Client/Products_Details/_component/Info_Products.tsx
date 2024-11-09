/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, message } from "antd";
import { useEffect, useState } from "react";
import { Convert_Color } from "@/configs/Color";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { mutatioinCart } from "@/common/hooks/Cart/mutationCart";
const Info_Products = ({ data_Detail }: any) => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const [largeImage, setLargeImage] = useState('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [stock, setStock] = useState();
    const [quantity, setQuantity] = useState(1);
    const [priceItem, setPriceItem] = useState<number | null>(null);
    const { mutate } = mutatioinCart('ADD');
    useEffect(() => {
        if (data_Detail?.product) {
            setLargeImage(data_Detail.product.images[0]);
        }
        if (data_Detail?.minPrice) {
            setMinPrice(data_Detail.minPrice);
            setPriceItem(data_Detail.minPrice);
        }
        if (data_Detail?.maxPrice) {
            setMaxPrice(data_Detail.maxPrice);
        }
    }, [data_Detail]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        const attribute = data_Detail?.attributes?.find((attr: any) => attr.color === color);
        if (attribute && attribute.images.length > 0) {
            setLargeImage(attribute.images[0]);
        }
        setSelectedSize(null);
        setPriceItem(minPrice);
    };
    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        const attribute = data_Detail?.attributes?.find((attr: any) => attr.color === selectedColor);
        const sizeAttribute = attribute?.sizes.find((s: any) => s.size === size);
        const price = sizeAttribute?.price ?? minPrice;
        setPriceItem(price);
        setStock(sizeAttribute?.stock ?? 0)
    };
    const uniqueSizes = Array.from(
        new Set(
            data_Detail?.attributes
                ?.filter((attr: any) => attr.color === selectedColor)
                ?.flatMap((attribute: any) => attribute.sizes.map((size: any) => size.size))
        )
    ).sort((a: any, b: any) => parseFloat(a) - parseFloat(b));
    const handleAddToCart = () => {
        if (!userId || !data_Detail?.product?._id) {
            message.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng kiểm tra lại thông tin người dùng hoặc sản phẩm.");
            return;
        }
        if (!selectedColor || !selectedSize) {
            message.error("Vui lòng chọn màu và kích thước trước khi thêm vào giỏ hàng.");
            return;
        }
        if (quantity > (stock ?? 0)) {

            message.error(`Vượt quá số lương có trong kho. Vui lòng chọn sản phẩm khác.`);
            return
        }
        const productData = {
            productId: data_Detail.product._id,
            userId,
            quantity,
            size: selectedSize,
            color: selectedColor,
            total_price_item: priceItem,
            total_price: (priceItem ?? 0) * quantity,
            status_checked: false
        };
        mutate(productData);
    };
    return (
        <div className="flex flex-col lg:flex-row gap-5 mt-9">
            <div className="basis-1/2">
                <Image src={largeImage} className="w-full h-full" alt="Product Image" />
                <div className="grid grid-cols-4 gap-4 mt-5 w-full">
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setLargeImage(data_Detail?.product?.images[0])}
                    >
                        <img
                            src={data_Detail?.product?.images[0]}
                            className="w-full h-auto max-w-xs border border-black"
                            alt="Product Thumbnail"
                        />
                    </div>
                    {data_Detail?.attributes?.map((attribute: any, index: number) => (
                        <div
                            key={attribute._id}
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => setLargeImage(attribute.images[0])}
                        >
                            <img
                                src={attribute.images[0]}
                                className="w-full h-auto max-w-xs border border-black"
                                alt={`Thumbnail ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="basis-1/2">
                <h1 className="font-bold text-xl">{data_Detail?.product?.name}</h1>
                <span className="flex gap-2 text-yellow-300 my-2">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                </span>
                <p className="text-lg font-medium my-2 flex gap-2">
                    {selectedSize ? (
                        <span>{priceItem?.toLocaleString("vi", { style: "currency", currency: "VND" })}</span>
                    ) : (
                        <span>{minPrice?.toLocaleString("vi", { style: "currency", currency: "VND" })} - {maxPrice?.toLocaleString("vi", { style: "currency", currency: "VND" })}</span>
                    )}
                </p>
                <div className="mb-3">
                    <h3 className="font-bold mb-3">Color</h3>
                    <div className="flex gap-4">
                        {data_Detail?.attributes?.map((attribute: any) => (
                            <div
                                key={attribute._id}
                                className={`w-9 h-9 rounded border border-black ${Convert_Color(attribute.color)} cursor-pointer relative`}
                                onClick={() => handleColorSelect(attribute.color)}
                            >
                                {selectedColor === attribute.color && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={attribute.color === "Trắng" ? "black" : "white"} className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-3">Size</h3>
                    <div className="flex items-center gap-4">
                        {uniqueSizes.length > 0 ? (
                            uniqueSizes.map((size: any, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSizeSelect(size)}
                                    className={`hover:bg-black hover:text-white border border-black px-3 py-2 rounded text-center relative ${selectedSize === size ? 'bg-black text-white' : ''}`}
                                >
                                    {size}
                                </button>

                            ))
                        ) : (
                            <span>Chọn màu trước khi chọn size</span>
                        )}

                    </div>
                </div>
                <div className="mt-5 flex justify-between gap-4">
                    <div className="flex items-center border border-black rounded w-auto h-12 pr-2">
                        <button
                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                            className="w-11 h-12 hover:bg-black hover:text-white text-2xl"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-11 pl-4 outline-none"
                        />
                        <button
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="w-11 h-12 hover:bg-black hover:text-white text-2xl"
                        >
                            +
                        </button>
                        {selectedColor && selectedSize && stock !== null && (
                            <p className="border-l border-black pl-1 lg:p-2 text-sm">Còn lại: {stock}</p>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white rounded w-[45%] h-12"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Info_Products;
