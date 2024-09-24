import { mutationAuth } from '@/common/hooks/Auth/mutationAuth';
import { LogoutOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Modal } from 'antd';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const { mutate } = mutationAuth('SIGNOUT');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        mutate()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
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

    const items1: MenuItem[] = [
        getItem(<NavLink to="/profile">Tài khoản</NavLink>, '1', <UserOutlined />, [
            getItem(<NavLink to="/profile">Hồ sơ</NavLink>, '3'),
            getItem(<NavLink to="/profile/address">Địa chỉ</NavLink>, '4'),
            getItem(<NavLink to="">Đổi mật khẩu</NavLink>, '5'),
        ]),
        getItem(<NavLink to="/profile/list_orders">Đơn hàng của tôi</NavLink>, '2', <TruckOutlined />),
        getItem(<button onClick={showModal}>Đăng xuất</button>, '3', <LogoutOutlined />),
    ];
    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items1}
            />
            <Modal
                title="Bạn có chắc muốn đăng xuất không?"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Đăng xuất"
                cancelText="Trở lại"
            >
                <p>Tài khoản của bạn sẽ được đăng xuất</p>
            </Modal>
        </>
    )
}

export default Sidebar