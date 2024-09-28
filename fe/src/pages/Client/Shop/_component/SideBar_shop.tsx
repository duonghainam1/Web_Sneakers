import { useCategory } from "@/common/hooks/Category/useCategory"
import { useState } from "react"

const SideBar_shop = () => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null)
    const { data } = useCategory()

    const toggleGroup = (group: string) => {
        setActiveGroup(activeGroup === group ? null : group)
    }

    return (
        <div>
            <div className="basis-1/5 hidden lg:block">
                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('categories')}>
                        <h1 className="font-bold">Danh mục</h1>
                        {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg></span> */}
                    </div>
                    <div className={`${activeGroup === 'categories' ? 'block' : 'hidden'}`}>
                        {data?.map((category: any) => (
                            <div className="flex justify-between items-center" key={category.id}>
                                <div className="flex items-center gap-2 mb-2">
                                    <input type="checkbox" className="w-4 h-4 rounded-lg" />
                                    <p className="text-base">{category?.category_name}</p>
                                </div>
                                {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg></span> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4 group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('price')}>
                        <h1 className="font-bold">Giá sản phẩm</h1>
                        {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg></span> */}
                    </div>
                    <div className={`${activeGroup === 'price' ? 'block' : 'hidden'}`}>
                        <div className="flex gap-3 mb-2">
                            <p>Price:</p>
                            <p>$0 - $2000</p>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('color')}>
                        <h1 className="font-bold">Màu sản phẩm</h1>
                        {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg></span> */}
                    </div>
                    <div className={`${activeGroup === 'color' ? 'block' : 'hidden'}`}>
                        {['Red', 'Blue', 'Orange', 'Black', 'Green', 'Yellow'].map((color, index) => (
                            <div className="flex justify-between items-center" key={color}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`bg-${color.toLowerCase()}-600 rounded-sm w-5 h-5`} />
                                    <p className="text-base">{color}</p>
                                </div>
                                <span>({[10, 14, 8, 9, 4, 2][index]})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="group">
                    <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('size')}>
                        <h1 className="font-bold">Kích thức sản phẩm</h1>
                        {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg></span> */}
                    </div>
                    <div className={`${activeGroup === 'size' ? 'block' : 'hidden'}`}>
                        {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size, index) => (
                            <div className="flex justify-between items-center" key={size}>
                                <div className="flex items-center gap-2 mb-2">
                                    <input type="checkbox" className="w-4 h-4 rounded-lg" />
                                    <p className="text-base">{size}</p>
                                </div>
                                <span>({[6, 20, 7, 16, 10, 2][index]})
                                </span>
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
