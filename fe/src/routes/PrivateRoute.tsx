import { type ReactElement } from "react";
import { Navigate } from "react-router";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { message } from "antd";
interface Props {
    children: ReactElement;
}
interface CustomJwtPayload extends JwtPayload {
    role?: string;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" />;
    }
    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        const { role } = decoded;
        if (role !== "admin" && role !== "staff") {
            message.error("Bạn không có quyền truy cập vào trang này");
            return <Navigate to="/signin" />;
        }
    } catch (error) {
        console.error("Token không hợp lệ", error);
        return <Navigate to="/signin" />;
    }
    return children;
};

export default PrivateRoute;
