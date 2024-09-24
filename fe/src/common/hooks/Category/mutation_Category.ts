import { Add_Category, Detele_Category, Update_Category } from "@/services/Category/category";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";

type Action = 'ADD' | 'UPDATE' | 'DELETE';
export const mutation_Category = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();

    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (category: any) => {
            try {
                switch (action) {
                    case 'ADD':
                        return await Add_Category(category)
                    case 'UPDATE':
                        return await Update_Category(category)
                    case 'DELETE':
                        return await Detele_Category(category)
                    default:
                        throw new Error('Invalid action type');
                }
            } catch (error: any) {
                throw new Error(error.message);

            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CATEGORY']
            })
            switch (action) {
                case 'ADD':
                    messageApi.open({
                        type: 'success',
                        content: 'Thêm thành công',
                    });
                    break;
                case 'DELETE':
                    messageApi.open({
                        type: 'success',
                        content: 'Xóa thành công',
                    });
                    break;
                case 'UPDATE':
                    messageApi.open({
                        type: 'success',
                        content: 'Cập nhật thành công',
                    });
                    break;
                default:
                    return null
            }
        },
        onError: (error: any) => {
            messageApi.open({
                type: 'error',
                content: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
            });
        }
    })
    return { mutate, ...rest, contextHolder }
}