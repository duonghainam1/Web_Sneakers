import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { message } from "antd";

interface DecodedToken extends JwtPayload {
    role: string;
}

interface PrivatePageProps {
    children: ReactNode;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user?.data?.accessToken;
        if (!token) {
            messageApi.error('Bạn chưa đăng nhập!');
            navigate('/');
            return;
        }
        console.log(token);

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            if (decoded.role === 'user') {
                messageApi.error('Bạn không có quyền truy cập trang này!');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                return;
            }
            setIsAuthorized(true);
        } catch (e) {
            messageApi.error('Token không hợp lệ!');
            navigate('/');
        }
    }, [navigate, messageApi]);

    if (isAuthorized) {
        return <>{children}</>;
    }
    return (
        <>
            {contextHolder}
        </>
    );
}

export default PrivatePage;