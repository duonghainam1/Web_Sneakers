import { Carousel } from "antd"
import banner_1 from '../../../../assets/icons/banner 1.png'
import banner_2 from '../../../../assets/icons/banner 2.jpg'
import banner_3 from '../../../../assets/icons/banner 3.jpg'
import banner_4 from '../../../../assets/icons/banner 4.jpg'
const Banner = () => {
    const contentStyle: React.CSSProperties = {
        height: '650px',
        color: '#fff',
        lineHeight: '650px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div className="mb-7">
            <div className="w-full h-dvh relative">
                <Carousel autoplay arrows draggable>
                    <div>
                        <img src={banner_1} style={contentStyle} className="w-full" alt="" />
                        {/* <h3 style={contentStyle}>1</h3> */}
                    </div>
                    <div>
                        <img src={banner_2} style={contentStyle} className="w-full" alt="" />
                        {/* <h3 style={contentStyle}>2</h3> */}
                    </div>
                    <div>
                        <img src={banner_3} style={contentStyle} className="w-full" alt="" />
                        {/* <h3 style={contentStyle}>3</h3> */}
                    </div>
                    <div>
                        <img src={banner_4} style={contentStyle} className="w-full" alt="" />
                        {/* <h3 style={contentStyle}>4</h3> */}
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Banner