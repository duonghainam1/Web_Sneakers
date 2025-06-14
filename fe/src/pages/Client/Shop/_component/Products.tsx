import Products_Item from "@/components/Items/Products"
import Fillter_Menu from "./Fillter_Menu"
import { useState, useEffect } from "react";
import { useProducts } from "@/common/hooks/Products/useProducts";
import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || "";
    const size = queryParams.get('size') || "";
    const color = queryParams.get('color') || "";
    const pageFromUrl = Number(queryParams.get('page')) || 1;
    const [pageSize, setPageSize] = useState(12);
    const { data, isLoading, totalDocs } = useProducts(undefined, pageFromUrl, pageSize, "", category, size, color);

    const handlePageChange = (page: number, pageSize: number) => {
        const newParams = new URLSearchParams(location.search);
        newParams.set('page', page.toString());
        navigate(`${location.pathname}?${newParams.toString()}`);
        setPageSize(pageSize);
    };
    useEffect(() => {
        if (category || size || color) {
            const newParams = new URLSearchParams(location.search);
            newParams.set('page', '1');
            navigate(`${location.pathname}?${newParams.toString()}`);
        }
    }, [category, size, color, location.pathname, navigate]);

    return (
        <div className="basis-4/5">
            <div className="mb-3 flex justify-between items-center">
                <div className="flex gap-4 lg:hidden">
                    <Fillter_Menu />
                    {/* <p>Products</p> */}
                </div>
                <p className="hidden lg:block text-2xl font-bold">Sản phẩm</p>
                {/* <div className="flex gap-1 items-center">
                    <p>Shot by latest</p>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dhn-icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div> */}
            </div>
            <Products_Item products={data} isLoading={isLoading} />
            <Pagination
                current={pageFromUrl}
                total={totalDocs}
                pageSize={pageSize}
                showSizeChanger
                onChange={handlePageChange}
                align="end"
                className="my-4"
            />
        </div>
    )
}

export default Products