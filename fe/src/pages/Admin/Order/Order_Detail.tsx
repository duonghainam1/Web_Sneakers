/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutation_Order } from "@/common/hooks/Order/mutation_Order";
import { useOrder } from "@/common/hooks/Order/useOrder";
import { LeftOutlined } from "@ant-design/icons";
import { message, Spin, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import Status_order from "./Status_order";
import Button_Order from "./Button_Order";

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
    const handle_Update_Status = async (newStatus: string) => {
        try {
            await mutate({ id, status: newStatus });
            message.success('Cập nhật trạng thái đơn hàng thành công!');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật trạng thái.');
        }
    }
    const columns = [
        {
            title: 'Ảnh ',
            dataIndex: 'image',
            key: 'image',
            render: (_: any, order: any) => {
                return (
                    <img src={order.product_image} alt="" width={100} />
                )
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'product_name',

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
    // const columns_shipper = [
    //     {
    //         title: 'Ảnh đại diện',
    //         dataIndex: 'image_shipper',
    //         key: 'image_shipper',
    //         render: (image: any) => <img src={image} className="w-12 h-12 rounded-full" />,
    //     },
    //     {
    //         title: 'Tên người giao',
    //         dataIndex: 'name_shipper',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Số điện thoại',
    //         dataIndex: 'phone_shipper',
    //         key: 'age',
    //     },
    //     {
    //         title: 'Địa chỉ',
    //         dataIndex: 'address_shipper',
    //         key: 'address_shipper',
    //     },
    //     {
    //         title: '',
    //         dataIndex: 'action',
    //         render: (_: any,) => {
    //             return (
    //                 <div className="flex gap-4">
    //                     <Button className="!bg-green-500 !text-white !border-none"><CheckOutlined /></Button>
    //                     <Button className="!bg-red-500 !text-white !border-none"><CloseOutlined /></Button>
    //                 </div>
    //             )
    //         }
    //     },
    // ];
    // const dataShipper = [
    //     {
    //         key: '1',
    //         image_shipper: 'https://picsum.photos/300/300',
    //         name_shipper: 'Mike',
    //         phone_shipper: 32,
    //         address_shipper: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         image_shipper: 'https://picsum.photos/300/300',
    //         name_shipper: 'Mike',
    //         phone_shipper: 32,
    //         address_shipper: '10 Downing Street',
    //     },
    // ];

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <div >
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/orders" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Chi tiết đơn hàng
                </h1>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-8">
                <div className="w-full lg:w-[68%] order-1">
                    {/* <div className="mb-8 px-6 py-6 border rounded shadow">
                        <p className="pb-8 text-lg font-bold">Người giao</p>
                        <Table dataSource={dataShipper} columns={columns_shipper} pagination={false} />

                    </div> */}
                    <div className=" mb-8 px-2 lg:px-6 py-6 border rounded shadow">
                        <p className="pb-6 text-lg font-bold">Sản phẩm</p>
                        <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 1000 }} />

                    </div>
                    <div className="border rounded shadow px-2   lg:px-6 py-6 mt-8 bg-white">
                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 pb-4 border-b border-gray-300">
                            <p className="lg:text-lg font-semibold text-gray-800 order-1">Phương thức thanh toán:</p>
                            <span className="border text-gray-700 p-2 rounded order-2">Thanh toán khi nhận hàng</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div>
                                <p className="text-gray-700">Tổng tiền:</p>
                                <p className="py-2 text-gray-700">Phí vận chuyển:</p>
                                <p className="font-semibold text-gray-800">Tổng thanh toán:</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-800 font-semibold">{data?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p className="py-2 text-gray-700">0 VND</p>
                                <p className="text-gray-800 font-semibold">{data?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[32%] h-1/2 border rounded shadow p-2 lg:p-4 order-2">
                    <p className="text-center pb-8 text-lg font-bold">Trạng thái</p>
                    <Status_order data_Order={data} />
                    <div>
                        <p className="text-center text-lg font-bold">Thông tin</p>
                        <div className="flex justify-between mt-4">
                            <div>
                                <p>Tên người mua:</p>
                                <p className="py-2">Số điện thoại:</p>
                                <p>Địa chỉ:</p>
                            </div>
                            <div>
                                <p>{data?.customerInfo?.userName}</p>
                                <p className="py-2">{data?.customerInfo?.phone}</p>
                                <p>{data?.customerInfo?.address_detail} - {data?.customerInfo?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center gap-4 mt-8 ">
                <Button_Order data={data} handle_Update_Status={handle_Update_Status} />
            </div>
        </div>
    )
}

export default Order_Detail