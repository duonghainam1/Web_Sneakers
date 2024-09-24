import { signIn, signUp } from "@/services/Auth/auth";
import { useMutation } from "@tanstack/react-query"
import { message } from "antd";
import { useLocalStorage } from "../useStorage";
import { useNavigate } from "react-router-dom";
type Action = 'SIGNIN' | 'SIGNUP' | 'SIGNOUT';
export const mutationAuth = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [, setUser] = useLocalStorage("user", {});

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
                        naviagte(`/`);
                    }, 100);

                    break;
                case 'SIGNUP':
                    messageApi.open({
                        type: 'success',
                        content: 'Đăng ký thành công',
                    });
                    naviagte(`/signin`);
                    break;
                case "SIGNOUT":
                    messageApi.open({
                        type: 'success',
                        content: 'Đăng xuất thành công',
                    });
                    naviagte(`/signin`);
                    break;
                default:
                    break;
            }
        },

    })
    return { mutate, contextHolder }
}