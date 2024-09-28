import { ArrowRightOutlined } from "@ant-design/icons"

const Date = () => {
    return (
        <div className="month lg:mx-28 lg:w-1/3 gap-4 items-center">
            <div className="flex flex-wrap lg:flex-col justify-center lg:justify-start">
                <h2 className="text-3xl font-medium mb-4">Khuyến mại trong tháng</h2>
                <p className="text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta officia aliquam
                    veritatis
                    molestias architecto, itaque sed corrupti animi similique perferendis. Ab deserunt
                    quibusdam
                    cumque ullam alias voluptatum sunt nemo? Perferendis?
                </p>
                <div className="flex gap-5 my-4">
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">120</h1>
                        <span>Days</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">18</h1>
                        <span>Hours</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">15</h1>
                        <span>Mins</span>
                    </div>
                    <div className="text-center border-2 w-16 h-16 rounded-md">
                        <h1 className="text-2xl font-bold">10</h1>
                        <span>Secs</span>
                    </div>
                </div>
                <button className="dhn-btn w-44 h-12 text-sm flex justify-center items-center gap-3 mt-8">
                    Xem tất cả <ArrowRightOutlined />
                </button>
            </div>
            <div>
                <img src="../img/Rectangle 3463273.png" alt="" />
            </div>
        </div>
    )
}

export default Date