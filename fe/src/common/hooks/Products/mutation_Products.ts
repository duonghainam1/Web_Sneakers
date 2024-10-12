import { Add_Products, Detele_Products, Update_Products } from "@/services/Products/products";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";

type Action = 'ADD' | 'UPDATE' | 'DELETE';
export const mutation_Products = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: any) => {
            switch (action) {
                case 'ADD':
                    return await Add_Products(product)
                case 'UPDATE':
                    return await Update_Products(product)
                case 'DELETE':
                    return await Detele_Products(product)
                default:
                    return null
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['PRODUCTS']
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
        }
    })
    return { mutate, ...rest, contextHolder }
}