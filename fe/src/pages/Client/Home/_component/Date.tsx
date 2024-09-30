import { ArrowRightOutlined } from "@ant-design/icons"
import logo from '../../../../assets/icons/ảnh date.jpg';

const Date = () => {
    return (
        <div className="lg:mx-28 gap-4 flex flex-wrap lg:flex-nowrap">
            <div className="flex flex-wrap order-2 lg:order-1 lg:w-1/2 lg:flex-col justify-center lg:justify-start">
                <h2 className="text-3xl font-medium mb-4">Khuyến mại trong tháng</h2>
                <p className="text-center lg:text-left">Trong tháng này, chúng tôi mang đến chương trình khuyến mại hấp dẫn dành cho tất cả khách hàng! Đừng bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với giá ưu đãi cực lớn:

                </p>
                <div className="flex gap-5 my-4">
                    <div className="text-center border-2 w-16 h-16 rounded">
                        <h1 className="text-xl font-bold">120</h1>
                        <span>Ngày</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded">
                        <h1 className="text-xl font-bold">18</h1>
                        <span>Giờ</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded">
                        <h1 className="text-xl font-bold">15</h1>
                        <span>Phút</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded">
                        <h1 className="text-xl font-bold">10</h1>
                        <span>Giây</span>
                    </div>
                </div>
                <button className="bg-black text-white rounded w-44 h-12 text-sm flex justify-center items-center gap-3 my-8">
                    Xem tất cả <ArrowRightOutlined />
                </button>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
                <img src={logo} className="w-full h-full object-cover" alt="" />
            </div>
        </div>
    )
}

export default Date