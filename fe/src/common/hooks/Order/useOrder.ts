import { get_order, get_order_byId, get_order_byUser } from "@/services/Order/order"
import { useQuery } from "@tanstack/react-query"

export const useOrder = (id?: string | number) => {
    const key = id ? ["ORDER", id] : ["ORDER"]
    const { data, isLoading } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return id ? await get_order_byId(id) : await get_order()
        }
    })
    return { data, isLoading }
}

export const useOrderById = (userId: string | number) => {
    const { data, isLoading } = useQuery({
        queryKey: ["ORDER", userId],
        queryFn: async () => {
            return await get_order_byUser(userId)
        }
    })
    return { data, isLoading }
}