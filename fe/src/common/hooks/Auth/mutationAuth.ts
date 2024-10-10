import { signIn, signUp, updateRole } from "@/services/Auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";
import { useLocalStorage } from "../useStorage";
import { useNavigate } from "react-router-dom";
type Action = 'SIGNIN' | 'SIGNUP' | 'SIGNOUT' | 'UPDATE_ROLE' | 'UPDATE_ACCOUNT';
export const mutationAuth = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [, setUser] = useLocalStorage("user", {});
    const queryClient = useQueryClient();
    const naviagte = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (user: any) => {
            console.log(user);
            try {
                switch (action) {
                    case 'SIGNIN':
                        return await signIn(user);
                    case 'SIGNUP':
                        return await signUp(user);
                    case 'SIGNOUT':
                        return localStorage.removeItem("user");
                    case "UPDATE_ROLE":
                        return await updateRole(user.id, user.role);
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
                case 'UPDATE_ROLE':
                    messageApi.open({
                        type: 'success',
                        content: 'Phân quyên thành công',
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