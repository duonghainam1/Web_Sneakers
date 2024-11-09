import { signIn, signUp, updateInforUser, updateRole } from "@/services/Auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";
import { useLocalStorage } from "../useStorage";
import { useNavigate } from "react-router-dom";
import { add_Address, delete_Address, update_isDefault } from "@/services/Auth/address";
type Action = 'SIGNIN' | 'SIGNUP' | 'SIGNOUT' | 'UPDATE_ROLE' | 'UPDATE_ACCOUNT' | 'ADD_ADDRESS' | 'UPDATE_ADDRESS' | 'DELETE_ADDRESS' | 'UPDATE_ISDEFAULT'
export const mutationAuth = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [, setUser] = useLocalStorage("user", {});
    const queryClient = useQueryClient();
    const naviagte = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (user: any) => {
            try {
                switch (action) {
                    case 'SIGNIN':
                        return await signIn(user);
                    case 'SIGNUP':
                        return await signUp(user);
                    case 'SIGNOUT':
                        return localStorage.removeItem("user");
                    case 'UPDATE_ACCOUNT':
                        return await updateInforUser(user.userId, user.data);
                    case "UPDATE_ROLE":
                        return await updateRole(user.id, user.role);
                    case "ADD_ADDRESS":
                        return await add_Address(user);
                    case "UPDATE_ISDEFAULT":
                        return await update_isDefault(user);
                    case "DELETE_ADDRESS":
                        return await delete_Address(user);
                    default:
                        return null;
                }
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (user: any) => {
            switch (action) {
                case 'SIGNIN':
                    setUser(user);
                    messageApi.open({
                        type: 'success',
                        content: 'Đăng nhập thành công',
                    });
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 100);
                    break;
                case 'SIGNUP':
                    messageApi.open({
                        type: 'success',
                        content: 'Đăng ký thành công',
                    });
                    naviagte(`/signin`);
                    break;
                case 'UPDATE_ACCOUNT':
                    messageApi.open({
                        type: 'success',
                        content: 'Cập nhật thông tin thành công',
                    });
                    queryClient.invalidateQueries(
                        { queryKey: ['AUTH'] }
                    )
                    break;
                case 'UPDATE_ROLE':
                    messageApi.open({
                        type: 'success',
                        content: 'Phân quyên thành công',
                    });
                    queryClient.invalidateQueries(
                        { queryKey: ['AUTH'] }
                    )
                    break;
                case 'ADD_ADDRESS':
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã thêm địa chỉ thành công',
                    });
                    queryClient.invalidateQueries(
                        { queryKey: ['AUTH'] }
                    )
                    break;
                case 'UPDATE_ISDEFAULT':
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã đăt làm mặc định thành công',
                    });
                    queryClient.invalidateQueries(
                        { queryKey: ['AUTH'] }
                    )
                    break;
                case 'DELETE_ADDRESS':
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã xóa địa chỉ thành công',
                    });
                    queryClient.invalidateQueries(
                        { queryKey: ['AUTH'] }
                    )
                    break;
                case "SIGNOUT":
                    messageApi.open({
                        type: 'success',
                        content: 'Đăng xuất thành công',
                    });
                    window.location.href = '/signin';
                    break;
                default:
                    break;
            }
        },

    })
    return { mutate, contextHolder }
}