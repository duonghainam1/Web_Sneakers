import { Button, Popconfirm } from "antd"
const Button_Order = ({ data, handle_Update_Status }: any) => {
    return (
        <div className="flex gap-4">
            {data?.status == '1' ? (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("2")}>Xác nhận</Button>
                    <Popconfirm
                        title="Hủy đơn hàng"
                        description="Bạn có chắc chắn muốn hủy đơn hàng này không?"
                        onConfirm={() => handle_Update_Status("5")}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="py-5 !bg-red-500 !text-white !border-none">Từ Chối</Button>
                    </Popconfirm>
                </>
            ) : data?.status == '2' ? (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("3")}>Xác nhận vận chuyển</Button>
                </>
            ) : data?.status == '3' ? (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("4")}>Đã giao hàng</Button>

                </>
            ) : data?.status == '4' ? (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none" onClick={() => handle_Update_Status("6")}>Hoàn thành</Button>
                </>
            ) : data?.status == '5' ? (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none cursor-not-allowed" disabled>Đơn hàng đã bị huy</Button>
                </>
            ) : (
                <>
                    <Button className="py-5 !bg-blue-500 !text-white !border-none cursor-not-allowed" disabled>Đơn hàng đã được hoàn thành</Button>
                </>
            )}
        </div>
    )
}

export default Button_Order