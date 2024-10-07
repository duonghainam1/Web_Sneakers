import { getRevenueStatisticsByDay, getRevenueStatisticsByMonth } from "@/services/Dashboard/dashboard"
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