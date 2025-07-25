import { Header } from 'antd/es/layout/layout'
import { theme, Input, Dropdown, Menu, Image } from "antd"
import { SearchProps } from 'antd/es/input';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/common/hooks/Auth/useAuth';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { logOut } from '@/services/Auth/auth';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const Header_admin = () => {
    const [user] = useLocalStorage("user", {});
    const navigate = useNavigate();
    const userId = user?.data?.user?._id;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { data } = useAuth(userId)
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const handleLogout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        await logOut();
        navigate("/signin");

    }
    const menu = (
        <Menu>
            <Menu.Item key="/" icon={<LogoutOutlined />}>
                Quay lại trang chủ
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    return (
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center gap-4 justify-end mx-4">
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <Dropdown overlay={menu} trigger={['click']}>
                <div className="flex items-center gap-3 cursor-pointer px-3">
                    <div className='flex items-center gap-3'>
                        <Image src={data?.user?.avatar} preview={false} width={40} height={40} className="rounded-full" />
                        <p>{data?.user?.name}</p>
                    </div>
                </div>
            </Dropdown>
        </Header>
    )
}


export default Header_admin