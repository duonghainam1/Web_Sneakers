import { get_order, get_order_byId, get_order_byUser } from "@/services/Order/order"
import { useQuery } from "@tanstack/react-query"

export const useOrder = (id?: string | number, page: number = 1, limit: number = 10, status: number | null = null, search: string = '') => {
    const { data, isLoading } = useQuery({
        queryKey: ["ORDER", id, page, limit, status, search],
        queryFn: async () => {
            return id ? await get_order_byId(id) : await get_order(page, limit, status, search)
        }
    })
    return { data, totalDocs: data?.data?.totalDocs, isLoading }
}

export const useOrderById = (userId: string | number, page: number = 1, limit: number = 10) => {
    const { data, isLoading } = useQuery({
        queryKey: ["ORDER", userId, page, limit],
        queryFn: async () => {
            return await get_order_byUser(userId, page, limit)
        }
    })
    return { data, totalDocs: data?.data?.totalDocs, isLoading }
}