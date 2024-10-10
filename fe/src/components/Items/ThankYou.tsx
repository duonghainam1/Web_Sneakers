import { Button, Result } from "antd"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const ThankYou = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const time = setTimeout(() => {
            navigate('/profile/list_orders')
        }, 3000)
        return () => {
            clearTimeout(time)
        }
    }, [navigate])
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