/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCategory } from "@/common/hooks/Category/useCategory"
import { useProducts } from "@/common/hooks/Products/useProducts"
import { Checkbox } from "antd"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface ProductAttribute {
    _id: string;
    productId: string;
    color: string;
    images: string[];
    sizes: {
        size: string;
        price: number;
        stock: number;
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    stock: number;
    sku: string;
    status: string;
    images: string[];
    featured: boolean;
    attributes: ProductAttribute[];
    createdAt: string;
    updatedAt: string;
}

const SideBar_shop = () => {
    const navigate = useNavigate()
    const [activeGroup, setActiveGroup] = useState<string | null>(null)
    const { data } = useCategory()
    const { data: products } = useProducts()
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)

    const location = useLocation();
    const [selectedId, setSelectedId] = useState<string | null>(null)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get("category");
        const colorParam = params.get("color");
        const sizeParam = params.get("size");

        if (categoryParam) {
            setSelectedId(categoryParam);
        }
        if (colorParam) {
            setSelectedColor(colorParam);
        }
        if (sizeParam) {
            setSelectedSize(sizeParam);
        }
    }, [location.search]);

    const toggleGroup = (group: string) => {
        setActiveGroup(activeGroup === group ? null : group)
    }

    const handleCategoryChange = (e: any) => {
        const { checked, value } = e.target;
        const params = new URLSearchParams(location.search);

        if (value === 'all') {
            setSelectedId(null);
            params.delete("category");
        } else {
            if (checked) {
                setSelectedId(value);
                params.set("category", value);
            } else {
                setSelectedId(null);
                params.delete("category");
            }
        }
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    const handleColorChange = (color: string) => {
        const params = new URLSearchParams(location.search);

        if (selectedColor === color) {
            setSelectedColor(null);
            params.delete("color");
        } else {
            setSelectedColor(color);
            params.set("color", color);
        }

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    const handleSizeChange = (size: string) => {
        const params = new URLSearchParams(location.search);

        if (selectedSize === size) {
            setSelectedSize(null);
            params.delete("size");
        } else {
            setSelectedSize(size);
            params.set("size", size);
        }

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    // Extract unique colors and sizes from products
    const uniqueColors: string[] = Array.from(new Set(
        products?.products?.docs?.flatMap((product: Product) =>
            product.attributes?.map((attr: ProductAttribute) => attr.color)
        ) || []
    ));

    const uniqueSizes: string[] = Array.from(new Set(
        products?.products?.docs?.flatMap((product: Product) =>
            product.attributes?.flatMap((attr: ProductAttribute) =>
                attr.sizes?.map(size => size.size)
            )
        ) || []
    ));

    // Count products for each color and size
    const colorCounts: Record<string, number> = uniqueColors.reduce<Record<string, number>>((acc, color) => {
        acc[color] = products?.products?.docs?.filter((product: Product) =>
            product.attributes?.some((attr: ProductAttribute) => attr.color === color)
        ).length || 0;
        return acc;
    }, {});

    const sizeCounts: Record<string, number> = uniqueSizes.reduce<Record<string, number>>((acc, size) => {
        acc[size] = products?.products?.docs?.filter((product: Product) =>
            product.attributes?.some((attr: ProductAttribute) =>
                attr.sizes?.some(s => s.size === size)
            )
        ).length || 0;
        return acc;
    }, {});

    return (
        <div className="w-[200px]">
            <div className="basis-1/5 hidden lg:block ">
                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('categories')}>
                        <h1 className="font-bold">Danh mục</h1>
                    </div>
                    <div className={`${activeGroup === 'categories' ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Checkbox
                                className="text-base"
                                value="all"
                                checked={selectedId === null}
                                onChange={(e) => handleCategoryChange(e)}
                            >
                                Tất cả sản phẩm
                            </Checkbox>
                        </div>
                        {data?.map((category: any) => (
                            <div className="flex justify-between items-center" key={category?._id}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Checkbox className="text-base" value={category?._id} checked={selectedId === category?._id} onChange={(e) => handleCategoryChange(e)} >
                                        {category?.category_name}
                                    </Checkbox>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="mb-4 group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('price')}>
                        <h1 className="font-bold">Giá sản phẩm</h1>
                    </div>
                    <div className={`${activeGroup === 'price' ? 'block' : 'hidden'}`}>
                        <div className="flex gap-3 mb-2">
                            <p>Price:</p>
                            <p>$0 - $2000</p>
                        </div>
                    </div>
                </div> */}

                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('color')}>
                        <h1 className="font-bold">Màu sắc</h1>
                    </div>
                    <div className={`${activeGroup === 'color' ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Checkbox
                                className="text-base"
                                checked={selectedColor === null}
                                onChange={() => handleColorChange('')}
                            >
                                Tất cả màu sắc
                            </Checkbox>
                        </div>
                        {uniqueColors.map((color: string) => (
                            <div className="flex justify-between items-center" key={color}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Checkbox
                                        checked={selectedColor === color}
                                        onChange={() => handleColorChange(color)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-sm`} style={{ backgroundColor: color.toLowerCase() }} />
                                            <p className="text-base">{color}</p>
                                        </div>
                                    </Checkbox>
                                </div>
                                <span>({colorCounts[color]})</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('size')}>
                        <h1 className="font-bold">Kích thước</h1>
                    </div>
                    <div className={`${activeGroup === 'size' ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Checkbox
                                className="text-base"
                                checked={selectedSize === null}
                                onChange={() => handleSizeChange('')}
                            >
                                Tất cả kích thước
                            </Checkbox>
                        </div>
                        {uniqueSizes.map((size: string) => (
                            <div className="flex justify-between items-center" key={size}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Checkbox
                                        checked={selectedSize === size}
                                        onChange={() => handleSizeChange(size)}
                                    >
                                        <p className="text-base">{size}</p>
                                    </Checkbox>
                                </div>
                                <span>({sizeCounts[size]})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default SideBar_shop
