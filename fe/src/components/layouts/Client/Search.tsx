import { Input, Button, List, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/common/hooks/Products/useProducts';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpened, setIsOpened] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const { data, isLoading } = useProducts(undefined, undefined, undefined, debouncedSearchTerm);
    const dataSources = data?.products?.docs?.map((item: any) => {
        return {
            id: item._id,
            name: item.name,
        }
    })
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm])
    const handleInputChange = (e: any) => {
        setSearchTerm(e.target.value);
        setIsOpened(e.target.value.length > 0);
    };

    const handleToggleSearch = () => {
        setIsOpened(prevState => !prevState);
    };

    return (
        <div className="container w-full flex flex-col items-center p-4 z-20">
            <div className="w-full md:w-1/2 flex justify-center">
                <Input
                    placeholder="Search"
                    className="flex-grow"
                    allowClear
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={handleToggleSearch}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    className="ml-2"
                    onClick={() => setIsOpened(true)}
                >
                    Search
                </Button>
            </div>

            {isOpened && (
                <div className="w-full md:w-3/4 mt-1 bg-white shadow-lg rounded p-4">
                    <h2 className="text-xl font-bold mb-2">Kết quả tìm kiếm</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center"><Spin size="large" /></div>
                    ) : (
                        <List
                            dataSource={dataSources || []}
                            renderItem={(item: any) => (
                                <List.Item className="flex justify-between items-center">
                                    <Link to={`/shops/${item?.id}`} className='text-black'>{item?.name}</Link>
                                </List.Item>
                            )}
                            className={`max-h-56 ${dataSources && dataSources.length > 1 ? 'h-56' : 'h-auto'} overflow-y-auto`}
                        />
                    )}
                    {data && data.products.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </div>
            )}
        </div>
    );
};

export default Search;
