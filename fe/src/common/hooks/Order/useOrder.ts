import { get_order, get_order_byId } from "@/services/Order/order"
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