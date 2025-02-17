import Header_admin from "@/components/layouts/Admin/Header/Header_admin"
import Sidebar from "@/components/layouts/Admin/Sidebar/Sidebar"
import { Breadcrumb, Layout, theme } from "antd"
import { Content, Footer } from "antd/es/layout/layout"
import { Outlet } from "react-router-dom"
const LayOutAdmin = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header_admin />
                <Content style={{ margin: '0 14px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 14,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    DHN ©{new Date().getFullYear()} Sneaker
                </Footer>
            </Layout>
        </Layout>
    )
}

export default LayOutAdmin