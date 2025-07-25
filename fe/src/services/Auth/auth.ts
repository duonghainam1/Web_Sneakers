import instance from "@/configs/axios";
import { toast } from "react-toastify";


export const getAuth = async () => {
    try {
        const { data } = await instance.get(`/auth`)
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng nhập thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
export const signIn = async (user: any) => {
    try {
        const data = await instance.post(`/auth/signin`, user);
        // const token = data.data.accessToken;
        // localStorage.setItem("token", token);
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
        console.log(error);

        if (error.response) {
            toast.error("Đăng xuất thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
export const updateRole = async (id: string, role: string) => {
    try {
        const data = await instance.put(`/auth/${id}`, { role });
        return data;
    } catch (error: any) {
        if (error.response) {
            toast.error("Cập nhật quyền thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
export const getUserById = async (userId: string) => {
    try {
        const { data } = await instance.get(`/auth/${userId}`);
        return data;
    } catch (error: any) {
        if (error.response) {
            toast.error("Không tìm thấy người dùng", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}

export const updateInforUser = async (userId: string, user: any) => {
    try {
        const data = await instance.put(`/auth/${userId}/updateInfor`, user);
        return data;
    } catch (error) {
        console.log(error);

    }
}