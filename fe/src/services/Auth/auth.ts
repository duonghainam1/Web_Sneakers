import instance from "@/configs/axios";
import { toast } from "react-toastify";


export const getAuth = async () => {
    try {
        const { data } = await instance.get(`/auth`)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const signIn = async (user: any) => {
    try {
        const data = await instance.post(`/auth/signin`, user);
        return data;
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng nhập thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
};

export const signUp = async (user: any) => {
    try {
        const data = await instance.post(`/auth/signup`, user);
        return data;
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng ký thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
export const logOut = async () => {
    try {
        const data = await instance.post(`/auth/logout`);
        return data;
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng xuất thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
