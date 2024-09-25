import { mutation_Order } from "@/common/hooks/Order/mutation_Order";
import { useOrder } from "@/common/hooks/Order/useOrder";
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table, Timeline } from "antd";
import { useParams } from "react-router-dom";

const Order_Detail = () => {
    const { id } = useParams()
    const { data, isLoading } = useOrder(id)
    const { mutate } = mutation_Order('UPDATE')
    const dataSource = data?.items?.map((item: any) => {
        return {
            key: item._id,
            ...item
        }
    })

    const columns = [
        {
            title: 'Ảnh ',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'total_price_item',
            key: 'total_price_item',
            render: (_: any, order: any) => {
                return (
                    <p>{(order?.total_price_item)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                )
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total_price_item',
            key: 'total_price_item',
            render: (_: any, order: any) => {
                return (
                    <p>{(order?.total_price_item * order?.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                )
            }

        },
    ];
    const columns_shipper = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image_shipper',
            key: 'image_shipper',
            render: (image: any) => <img src={image} className="w-12 h-12 rounded-full" />,
        },
        {
            title: 'Tên người giao',
            dataIndex: 'name_shipper',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_shipper',
            key: 'age',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address_shipper',
            key: 'address_shipper',
        },
        {
            title: '',
            dataIndex: 'action',
            render: (_: any,) => {
                return (
                    <div className="flex gap-4">
                        <Button className="!bg-green-500 !text-white !border-none"><CheckOutlined /></Button>
                        <Button className="!bg-red-500 !text-white !border-none"><CloseOutlined /></Button>
                    </div>
                )
            }
        },
    ];
    const dataShipper = [
        {
            key: '1',
            image_shipper: 'https://picsum.photos/300/300',
            name_shipper: 'Mike',
            phone_shipper: 32,
            address_shipper: '10 Downing Street',
        },
        {
            key: '2',
            image_shipper: 'https://picsum.photos/300/300',
            name_shipper: 'Mike',
            phone_shipper: 32,
            address_shipper: '10 Downing Street',
        },
    ];
    const handle_Update_Status = async (newStatus: string) => {
        try {
            await mutate({ id, status: newStatus });
            message.success('Cập nhật trạng thái đơn hàng thành công!');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật trạng thái.');
        }
    }
    if (isLoading) return <p>Loading...</p>
    return (
        <div >
            <h1 className="text-center text-2xl pb-8 font-bold">Chi tiết đơn hàng</h1>
            <div className="flex gap-8">
                <div className="w-[68%]">
                    <div className="mb-8">
                        <p className="pb-8 text-lg font-bold">Người giao</p>
                        <Table dataSource={dataShipper} columns={columns_shipper} pagination={false} />

                    </div>
                    <div className="mb-8">
                        <p className="pb-8 text-lg font-bold">Sản phẩm</p>
                        <Table dataSource={dataSource} columns={columns} pagination={false} />

                    </div>
                    <div className="border px-3 py-8 mt-8">
                        <div className="flex items-center gap-8 pb-4">
                            <p className="text-lg font-bold"> Phương thức thanh toán:</p>
                            <span className="border p-3 rounded">Thanh toán khi nhận hàng</span>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p>Tổng tiền:</p>
                                <p className="py-2">Phí vận chuyển:</p>
                                <p>Tổng thanh toán:</p>
                            </div>
                            <div>
                                <p>{data?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p className="py-2">0 VND</p>
                                <p>{data?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        {data.status == '1' ? (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("2")}>Xác nhận</Button>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => handle_Update_Status("5")}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                                </Popconfirm>
                            </>
                        ) : data.status == '2' ? (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("3")}>Xác nhận vận chuyển</Button>
                            </>
                        ) : data.status == '3' ? (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("4")}>Đã giao hàng</Button>

                            </>
                        ) : data.status == '4' ? (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("2")}>Xác nhận</Button>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => handle_Update_Status("5")}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                                </Popconfirm>
                            </>
                        ) : data.status == '5' ? (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("2")}>Xác nhận</Button>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => handle_Update_Status("5")}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("2")}>Xác nhận</Button>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => handle_Update_Status("5")}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                                </Popconfirm>
                            </>
                        )}

                    </div>
                </div>
                <div className="w-[32%] border rounded p-4">
                    <p className="text-center pb-8 text-lg font-bold">Trạng thái</p>
                    <Timeline
                        mode="alternate"
                        items={[
                            {
                                children: 'Chờ xác nhận 2015-09-01',
                            },
                            {
                                children: 'Đang chuẩn bị 2015-09-01',
                                color: 'green',
                            },
                            {
                                dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                                children: `Đang vận chuyển 2015-09-01`,
                            },
                            {
                                color: 'red',
                                children: 'Đã giao 2015-09-01',
                            },
                            {
                                children: 'Hoàn thành 2015-09-01',
                            },
                            {
                                dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                                children: 'Đã hủy 2015-09-01',
                            },
                        ]}
                    />
                    <div>
                        <p className="text-center text-lg font-bold">Thông tin</p>
                        <div className="flex justify-between mt-4">
                            <div>
                                <p>Tên người mua:</p>
                                <p className="py-2">Số điện thoại:</p>
                                <p>Địa chỉ:</p>
                            </div>
                            <div>
                                <p>{data?.customerInfo?.name}</p>
                                <p className="py-2">{data?.customerInfo?.phone}</p>
                                <p>{data?.customerInfo?.address_detail} - {data?.customerInfo?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Order_Detail