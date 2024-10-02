import { useOrder } from "@/common/hooks/Order/useOrder";
import { EllipsisOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd"
import { random } from "lodash";
import { Link } from "react-router-dom";

const List_Order = () => {
    const { data } = useOrder()
    const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    const ramdomColor = () => {
        return (
            colors[Math.floor(Math.random() * colors.length)]
        )
    };
    const columns = [
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
                    <p>{order.customerInfo.name}</p>
                )
            }
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (_: any, order: any) => {
                return (
                    <p>{order.customerInfo.phone}</p>
                )
            }
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, order: any) => {
                return (
                    <Tag color={ramdomColor()}>{order.status == 1 ? "Chờ xác nhận" : order.status == 2 ? 'Đang chuẩn bị hàng' : order.status == 3 ? 'Đang vận chuyển' : order.status == 4 ? 'Đã giao' : order.status == 6 ? 'Hoàn thành' : "Đã hủy"}</Tag>
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
                        <Link to={`/admin/orders/${order._id}`}><EllipsisOutlined /></Link>
                    </div>
                )
            }
        },
    ];
    const dataSource = data?.data?.map((order: any) => {
        return {
            key: order._id,
            ...order
        }
    })
    return (
        <>
            <Table columns={columns} dataSource={dataSource} />
        </>
    )
}

export default List_Order