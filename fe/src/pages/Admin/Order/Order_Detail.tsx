import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, Timeline } from "antd";

const Order_Detail = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
            render: (_: any, order: any) => {
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
                                <p>200.000 VND</p>
                                <p className="py-2">0 VND</p>
                                <p>200.000 VND</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button className="py-5 !bg-blue-500 !text-white !border-none">Xác nhận</Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            // onConfirm={confirm}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                        </Popconfirm>

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
                                <p>Dương Hải Nam</p>
                                <p className="py-2">0123456789</p>
                                <p>Minh Khai Hà Nội</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Order_Detail