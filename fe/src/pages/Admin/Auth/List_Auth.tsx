/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutationAuth } from "@/common/hooks/Auth/mutationAuth"
import { useAuth } from "@/common/hooks/Auth/useAuth"
import { Spin, Table } from "antd"

const List_Auth = () => {
    const { data, isLoading } = useAuth()
    const { mutate, contextHolder } = mutationAuth('UPDATE_ROLE')
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
                    <select
                        value={role}
                        onChange={(e) => {
                            mutate({ id: record.key, role: e.target.value })
                        }}
                    >
                        <option value="user">Người dùng</option>
                        <option value="staff">Nhân viên</option>
                        <option value="admin">Quản lý</option>
                    </select>
                )
            }
        }
    ]
    const dataSource = data?.user?.map((auth: any) => {
        return (
            {
                key: auth._id,
                ...auth
            }
        )
    })
    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <>
            {contextHolder}
            <Table columns={colums} dataSource={dataSource} scroll={{ x: 1000 }} />
        </>
    )
}

export default List_Auth