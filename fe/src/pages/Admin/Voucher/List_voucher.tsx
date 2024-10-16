import { mutation_Voucher } from "@/common/hooks/Voucher/mutation_Voucher"
import { useVoucher } from "@/common/hooks/Voucher/useVoucher"
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons"
import { Button, Popconfirm, Spin, Table } from "antd"
import { Link } from "react-router-dom"

const List_voucher = () => {
    const { data, isLoading } = useVoucher();
    const { mutate, contextHolder } = mutation_Voucher('DELETE')
    const dataSource = data?.voucher?.map((voucher: any) => {
        return {
            key: voucher._id,
            ...voucher
        }
    })

    const columns: any = [
        {
            title: 'Mã voucher',
            dataIndex: 'code_voucher',
            key: 'code_voucher',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount_voucher',
            key: 'discount_voucher',
            render: (_: any, voucher: any) => {
                return (
                    <p>
                        {voucher.discountType_voucher === 'percent'
                            ? `${voucher.discount_voucher}%`
                            : voucher.discount_voucher.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                );
            }
        },

        {
            title: 'Số lượng',
            dataIndex: 'usageLimit_voucher',
            key: 'usageLimit_voucher',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'startDate_voucher',
            key: 'startDate_voucher',
            render: (_: any, voucher: any) => {
                return (
                    <p>{new Date(voucher?.startDate_voucher).toLocaleDateString('vi-VN')}</p>
                )
            }
        },
        {
            title: 'Ngày kết thúc',

            render: (_: any, voucher: any) => {
                return (
                    <p>{new Date(voucher?.endDate_voucher).toLocaleDateString('vi-VN')}</p>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status_voucher',
            key: 'status_voucher',
            render: (_: any, voucher: any) => {
                return (
                    <div>
                        {voucher.status_voucher === true ? <Button type="primary">Đang hoạt động</Button> : <Button >Hết hạn</Button>}
                    </div>
                )
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_: any, voucher: any) => {
                return (
                    <div className="flex gap-4 justify-center">
                        <Link to={`/admin/voucher/${voucher?._id}`}>
                            <EditOutlined style={{ fontSize: "20px" }} />
                        </Link>
                        <Popconfirm
                            title="Xóa voucher"
                            description="Bạn có chắc chắn muốn xóa voucher này không?"
                            onConfirm={() => mutate(voucher?._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ fontSize: "20px" }} />
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <div>
            {contextHolder}
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl">Danh sách voucher</h1>
                <Link to="/admin/voucher/add">
                    <Button type="primary" icon={<PlusCircleFilled />}>
                        Thêm
                    </Button>
                </Link>
            </div>
            <div>
                <Table dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} />
            </div>
        </div>
    )
}

export default List_voucher