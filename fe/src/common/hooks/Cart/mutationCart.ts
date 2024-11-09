import instance from "@/configs/axios"
import { add_To_Cart, decrease_Quantity, delete_Cart, increase_Quantity, update_Cart_status, } from "@/services/Cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";
type Action = 'ADD' | 'UPDATE' | 'DELETE' | 'UPDATE_STATUS' | 'INCREASE' | 'REDUCE';
export const mutatioinCart = (action: Action) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (cart: any) => {
            switch (action) {
                case 'ADD':
                    return await add_To_Cart(cart)
                case 'UPDATE':
                    return await instance.put(`/cart`)
                case 'DELETE':
                    return await delete_Cart(cart)
                case 'UPDATE_STATUS':
                    return await update_Cart_status(cart)
                case 'INCREASE':
                    return await increase_Quantity(cart)
                case "REDUCE":
                    return await decrease_Quantity(cart)
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
                    message.success('Thêm sản phẩm vào giỏ hàng thành công');
                    break;
                case 'DELETE':
                    message.success('Xóa sản phẩm khỏi giỏ hàng thành công');
                    break;

                default:
                    break;
            }
        }
    })
    return { mutate, ...rest }
}
