/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Button, List, Spin, Empty, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/common/hooks/Products/useProducts';
import { motion, AnimatePresence } from 'framer-motion';

const { Text } = Typography;

interface SearchProps {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setIsOpened }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpened, setIsOpenedLocal] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const searchRef = useRef<HTMLDivElement>(null);

    const { data, isLoading } = useProducts(undefined, undefined, undefined, debouncedSearchTerm);

    const dataSources = data?.products?.docs?.map((item: any) => ({
        id: item._id,
        name: item.name,
        image: item.images?.[0]
    }));

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpenedLocal(false);
                setIsOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpened]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpenedLocal(e.target.value.length > 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpenedLocal(false);
            setIsOpened(false);
        }
    };

    const handleProductClick = () => {
        setIsOpenedLocal(false);
        setIsOpened(false);
        setSearchTerm('');
    };

    return (
        <div className="container w-full flex flex-col items-center p-4 z-20 mt-24" ref={searchRef}>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
                <div className="flex gap-2 items-center" >
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        className="flex-grow"
                        allowClear
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        prefix={<SearchOutlined className="text-gray-400 py-4 px-2" />}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => setIsOpened(true)}
                        className="py-4 px-2 bg-blue text-white"
                    >
                        Tìm kiếm
                    </Button>
                </div>

                <AnimatePresence>
                    {isOpened && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full bg-white shadow-lg rounded-[10px] p-4 mt-2"
                        >
                            <Text strong className="text-lg mb-4 block">Kết quả tìm kiếm</Text>

                            {isLoading ? (
                                <div className="flex justify-center items-center py-8">
                                    <Spin size="large" />
                                </div>
                            ) : (
                                <div className="max-h-[400px] overflow-y-auto ">
                                    {dataSources && dataSources.length > 0 ? (
                                        <List
                                            dataSource={dataSources}
                                            renderItem={(item: any) => (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="hover:bg-gray-100 transition-colors"
                                                >
                                                    <List.Item className="flex justify-between items-center p-2">
                                                        <Link
                                                            to={`/shops/${item.id}`}
                                                            onClick={handleProductClick}
                                                            className="text-black hover:text-blue-600 transition-colors flex items-center gap-3"
                                                        >
                                                            {item.image && (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                            )}
                                                            {item.name}
                                                        </Link>
                                                    </List.Item>
                                                </motion.div>
                                            )}
                                        />
                                    ) : (
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description="Không tìm thấy sản phẩm phù hợp"
                                        />
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Search;
