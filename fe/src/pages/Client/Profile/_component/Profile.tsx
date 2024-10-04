import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"

const Profile = () => {
    return (
        <div className="flex gap-4">
            <div className="w-[70%] border">

            </div>
            <div className="w-[30%] flex flex-col gap-y-8 items-center justify-center">
                <Avatar size={200} icon={<UserOutlined />} />
                <Button>Chọn ảnh</Button>
            </div>
        </div>
    )
}

export default Profile