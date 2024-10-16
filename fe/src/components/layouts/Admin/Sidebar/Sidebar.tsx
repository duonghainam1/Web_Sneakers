import {
    DollarOutlined,
    FileTextOutlined,
    PieChartOutlined,
    TeamOutlined,
    TransactionOutlined,
    TruckOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to="/admin">Thống kê</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink to="/admin/counter-sales">Bán hàng tại quầy</NavLink>, '2', <DollarOutlined />),
    getItem(<NavLink to="/admin/products">Sản phẩm</NavLink>, 'sub1', <FileTextOutlined />, [
        getItem(<NavLink to="/admin/products">Sản phẩm</NavLink>, '3'),
        getItem(<NavLink to="/admin/categori">Danh mục</NavLink>, '4'),
    ]),

    getItem(<NavLink to="/admin/orders">Đơn hàng</NavLink>, '5', <TruckOutlined />),
    getItem(<NavLink to="/admin/auth">Tài khoản</NavLink>, '6', <TeamOutlined />),
    getItem(<NavLink to="/admin/voucher">Giảm giá</NavLink>, '7', <TransactionOutlined />),
];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            < div className="demo-logo-vertical">
                <img src="https://picsum.photos/200/50" alt="" className='p-2' />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider >
    );
}

export default Sidebar