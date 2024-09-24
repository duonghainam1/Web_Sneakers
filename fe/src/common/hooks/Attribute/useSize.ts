import { get_Size } from "@/services/Attributes/size"
import { useQuery } from "@tanstack/react-query"

export const useSize = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['SIZE'],
        queryFn: async () => {
            return await get_Size()
        }
    })
    return { data, isLoading }
}