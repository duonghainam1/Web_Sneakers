import { get_order_limit, getRevenueStatisticsByDay, getRevenueStatisticsByMonth } from "@/services/Dashboard/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useDashboard = () => {
    const { data, ...rest } = useQuery({
        queryKey: ['DASHBOARD'],
        queryFn: async () => {
            return await getRevenueStatisticsByDay()
        }
    })
    return { data, ...rest }
}
export const useDashboard_month = () => {
    const { data, ...rest } = useQuery({
        queryKey: ['DASHBOARD_MONTH'],
        queryFn: async () => {
            return await getRevenueStatisticsByMonth()
        }
    })
    return { data, ...rest }
}
export const useDashboard_order_limit = () => {
    const { data, ...rest } = useQuery({
        queryKey: ['DASHBOARD_ORDER_LIMIT'],
        queryFn: async () => {
            return await get_order_limit()
        }
    })
    return { data, ...rest }
}