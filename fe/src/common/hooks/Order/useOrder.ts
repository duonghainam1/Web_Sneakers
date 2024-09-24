import { get_order, get_order_byId } from "@/services/Order/order"
import { useQuery } from "@tanstack/react-query"

export const useOrder = (userId?: string | number) => {
    const key = userId ? ["ORDER", userId] : ["ORDER"]
    const { data } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return userId ? await get_order_byId(userId) : await get_order()
        }
    })
    return { data }
}