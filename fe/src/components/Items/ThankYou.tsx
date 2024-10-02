import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const ThankYou = () => {
    return (
        <Result
            status="success"
            title="Bạn đã đặt hàng thành công"
            subTitle="Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
            extra={[
                <>
                    <Link to="/">
                        <Button type="primary" key="console">
                            Quay lại trang chủ
                        </Button>
                    </Link>
                    <Link to="/profile/list_orders">
                        <Button key="buy">
                            Xem đơn hàng
                        </Button>
                    </Link>
                </>


            ]}
        />
    )
}

export default ThankYou