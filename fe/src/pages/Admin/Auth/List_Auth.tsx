/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutationAuth } from "@/common/hooks/Auth/mutationAuth"
import { useAuth } from "@/common/hooks/Auth/useAuth"
import { useLocalStorage } from "@/common/hooks/useStorage";
import { Select, Spin, Table, Tag } from "antd"

const List_Auth = () => {
    const [user] = useLocalStorage("user", {});
    const { data, isLoading } = useAuth()
    const { mutate, contextHolder } = mutationAuth('UPDATE_ROLE')
    const dataSource = data?.user?.map((auth: any) => {
        return (
            {
                key: auth._id,
                ...auth
            }
        )
    })
    const a = user.data.user.role
    const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    const ramdomColor = () => {
        return (
            colors[Math.floor(Math.random() * colors.length)]
        )
    };
    const colums = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role',
            render: (role: any, record: any) => {
                return (
                    a === "admin" ? (

                        <Select
                            value={role}
                            onChange={(value) => {
                                mutate({ id: record.key, role: value })
                            }}
                            style={{ width: 150 }}
                        >
                            <Select.Option value="user">Người dùng</Select.Option>
                            <Select.Option value="staff">Nhân viên</Select.Option>
                            <Select.Option value="admin">Quản lý</Select.Option>
                        </Select>
                    ) : (
                        <Tag color={ramdomColor()} className="w-[100px] text-sm">{role === "admin" ? ("Quản lý") : role === "staff" ? ("Nhân viên") : ("Người dùng")}</Tag>

                    )

                )
            }
        }
    ]

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <>
            {contextHolder}
            <Table columns={colums} dataSource={dataSource} scroll={{ x: 1000 }} />
        </>
    )
}

export default List_Auth