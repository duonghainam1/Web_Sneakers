import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import Sidebar from "./_component/Sidebar";



const Page = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="!bg-white">
            <Content style={{ padding: '0 48px' }}>
                <Layout style={{ padding: '50px 0' }} className="!bg-white">
                    <Sider style={{ background: colorBgContainer }} width={200} >
                        <Sidebar />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }} className="!bg-white"><Outlet /></Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Page