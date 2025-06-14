/* eslint-disable @typescript-eslint/no-explicit-any */
// import { mutationAuth } from '@/common/hooks/Auth/mutationAuth';
import { mutationAuth } from '@/common/hooks/Auth/mutationAuth';
import { DashboardOutlined, LogoutOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Modal } from 'antd';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const { mutate }: any = mutationAuth('SIGNOUT');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user?.data?.user?.role === 'admin' || user?.data?.user?.role === 'staff';
    console.log('user', isAdmin);

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
        getItem(<NavLink to="/profile"><p className='hidden lg:block'>Tài khoản</p></NavLink>, '1', <UserOutlined />, [
            getItem(<NavLink to="/profile"><p className='hidden lg:block'>Hồ sơ</p></NavLink>, '3'),
            getItem(<NavLink to="/profile/address"><p className='hidden lg:block'>Địa chỉ</p></NavLink>, '4'),
            getItem(<NavLink to=""><p className='hidden lg:block'>Đổi mật khẩu</p></NavLink>, '5'),
        ]),
        getItem(<NavLink to="/profile/list_orders"><p className='hidden lg:block'>Đơn hàng của tôi</p></NavLink>, '2', <TruckOutlined />),
        // getItem(<NavLink to="/admin"><p className='hidden lg:block'>Trang quản trị</p></NavLink>, '2', <TruckOutlined />),
        isAdmin ? getItem(<NavLink to="/admin"><p className='hidden lg:block'>Trang quản trị</p></NavLink>, '2', <DashboardOutlined />) : null,

        getItem(
            <button onClick={showModal} className="flex items-center space-x-2">
                <LogoutOutlined />
                <p className="hidden lg:block">Đăng xuất</p>
            </button>,
            '3'
        ),
    ];
    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', padding: '0 0 10px 0px' }}
                items={items1}
            />
            <Modal
                title="Bạn có chắc muốn đăng xuất không?"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Đăng xuất"
                cancelText="Trở lại"
                className='w-10'
            >
                <p>Tài khoản của bạn sẽ được đăng xuất</p>
            </Modal>
        </>
    )
}

export default Sidebar