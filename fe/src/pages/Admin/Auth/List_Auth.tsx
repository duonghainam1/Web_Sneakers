import { useAuth } from "@/common/hooks/Auth/useAuth"
import { Table } from "antd"

const List_Auth = () => {
    const { data, isLoading } = useAuth()
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
    if (isLoading) return <p>Loading...</p>
    return (
        <>
            <Table columns={colums} dataSource={dataSource} />
        </>
    )
}

export default List_Auth