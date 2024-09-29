import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import Sidebar from "./_component/Sidebar";
import { useState } from "react";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

const Page = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout className="bg-white">
            <Content style={{ padding: '0' }}>
                <Layout className="bg-white p-0">
                    <Sider
                        style={{ background: colorBgContainer }}
                        width={`md:w-2 md:pr-2`}
                        className={`md:block ${collapsed ? 'hidden' : 'block'} `}
                    >
                        <Sidebar />
                    </Sider>
                    <Content
                        className="bg-white w-full px-1 lg:px-6"
                    >
                        <button
                            className="md:hidden"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <FullscreenOutlined style={{ fontSize: "24px" }} /> : <FullscreenExitOutlined style={{ fontSize: "24px" }} />}
                        </button>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Page;
