import instance from "@/configs/axios"
import { add_To_Cart, delete_Cart, update_Cart_status, } from "@/services/Cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";
type Action = 'ADD' | 'UPDATE' | 'DELETE' | 'UPDATE_STATUS';
export const mutatioinCart = (action: Action) => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (cart: any) => {
            switch (action) {
                case 'ADD':
                    return await add_To_Cart(cart)
                case 'UPDATE':
                    return await instance.put(`/cart`)
                // case 'DELETE':
                //     return await delete_Cart(cart)
                case 'UPDATE_STATUS':
                    return await update_Cart_status(cart)
                default:
                    return null
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CART']
            })

            switch (action) {
                case 'ADD':
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã thêm sản phẩm vào giỏ hàng thành công',
                    });
                    break;
                case 'DELETE':
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã xóa sản phẩm khỏi giỏ hàng thành công',
                    });
                    break;
                default:
                    break;
            }
        }
    })
    return { mutate, ...rest, contextHolder }
}