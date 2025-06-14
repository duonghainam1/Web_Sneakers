/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCategory } from '@/common/hooks/Category/useCategory';
import { MenuOutlined } from '@ant-design/icons';
import { Checkbox, Drawer, Space } from 'antd'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Fillter_Menu = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get("category");
        if (categoryParam) {
            setSelectedId(categoryParam);
        }
    }, [location.search]);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [activeGroup, setActiveGroup] = useState<string | null>(null)
    const { data } = useCategory()
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
    return (
        <>
            <Space>
                <MenuOutlined style={{ fontSize: '24px' }} onClick={showDrawer} />
            </Space>
            <Drawer
                title="Lọc sản phẩm"
                placement={'left'}
                closable={false}
                onClose={onClose}
                open={open}
                key={'left'}
                width={240}
            >
                <div>
                    <div className="basis-1/5">
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
                                    <div className="flex justify-between items-center" key={category._id}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Checkbox className="text-base" value={category?._id} checked={selectedId === category?._id} onChange={(e) => handleCategoryChange(e)} >
                                                {category?.category_name}
                                            </Checkbox>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 group">
                            <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleGroup('price')}>
                                <h1 className="font-bold">Giá sản phẩm</h1>
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
            </Drawer>
        </>
    )
}

export default Fillter_Menu