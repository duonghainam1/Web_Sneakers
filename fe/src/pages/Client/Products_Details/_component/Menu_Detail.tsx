import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Menu_Detail = ({ data_Detail }: any) => {
    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
                    },
                    {
                        title: <Link to="/shops" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
                    },
                    {
                        title: data_Detail?.product?.category?.category_name
                    }
                ]}
            />
        </div>
    )
}

export default Menu_Detail