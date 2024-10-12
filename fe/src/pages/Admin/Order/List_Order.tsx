import { useOrder } from "@/common/hooks/Order/useOrder";
import { EllipsisOutlined } from "@ant-design/icons";
import { Select, Spin, Table, TableProps, Tag } from "antd"
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Typography } from 'antd';

const { Title } = Typography;
const List_Order = () => {
    const [searchParmas, setSearchParams] = useSearchParams()
    const currenPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const statusUrl = searchParmas.get('status') ? Number(searchParmas.get('status')) : null;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currentPage, setCurrentPage] = useState<number>(currenPageUrl);
    const [pageSize, setPageSize] = useState<number>(pageSizeUrl);
    const [status, setStatus] = useState<number | null>(statusUrl);
    const { data, totalDocs, isLoading } = useOrder(undefined, currentPage, pageSize, status);
    useEffect(() => {
        const params: any = {}
        if (status) {
            params['status'] = status;
        }
        if (currentPage !== 1) {
            params['page'] = currentPage;
        }
        if (pageSize !== 10) {
            params['pageSize'] = pageSize
        }
        setSearchParams(params)
    }, [currentPage, status, pageSize, setSearchParams])
    const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    const ramdomColor = () => {
        return (
            colors[Math.floor(Math.random() * colors.length)]
        )
    };
    const columns: TableProps<any>['columns'] = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Người mua',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, order: any) => {
                return (
                    <p>{order?.customerInfo?.userName}</p>
                )
            }
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (_: any, order: any) => {
                return (
                    <p>{order?.customerInfo?.phone}</p>
                )
            }
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_: any, order: any) => {
                return (
                    <p> {new Date(order?.createdAt).toLocaleString('vi-VN')}</p>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, order: any) => {
                return (
                    <Tag color={ramdomColor()}>{order?.status == 1 ? "Chờ xác nhận" : order?.status == 2 ? 'Đang chuẩn bị hàng' : order?.status == 3 ? 'Đang vận chuyển' : order?.status == 4 ? 'Đã giao' : order?.status == 6 ? 'Hoàn thành' : "Đã hủy"}</Tag>
                )
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, order: any) => {
                return (
                    <div className="flex justify-center">
                        <Link to={`/admin/orders/${order?._id}`}><EllipsisOutlined /></Link>
                    </div>
                )
            }
        },
    ];
    const dataSource = data?.data?.docs?.map((order: any) => {
        return {
            key: order._id,
            ...order
        }
    })
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <>
            <div className="flex justify-between">
                <Title level={2}>Danh sách đơn hàng</Title>
                <Select style={{ width: "200px" }} defaultValue={status} onChange={(value: number | null) => setStatus(value)}>
                    <Select.Option value={null}>Tất cả</Select.Option>
                    <Select.Option value={1}>Chờ xác nhận</Select.Option>
                    <Select.Option value={2}>Đang chuẩn bị hàng</Select.Option>
                    <Select.Option value={3}>Đang vận chuyển</Select.Option>
                    <Select.Option value={4}>Đã giao</Select.Option>
                    <Select.Option value={6}>Hoàn thành</Select.Option>
                    <Select.Option value={5}>Đã hủy</Select.Option>
                </Select>
            </div>
            <Table columns={columns} dataSource={dataSource} pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalDocs,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                },
                onShowSizeChange: (current, size) => {
                    setCurrentPage(current);
                    setPageSize(size);
                }
            }}
            />
        </>
    )
}

export default List_Order