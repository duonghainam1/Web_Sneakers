import { get_Color } from "@/services/Attributes/color"
import { useQuery } from "@tanstack/react-query"

export const useColor = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['COLOR'],
        queryFn: async () => {
            return await get_Color()
        }
    })
    return { data, isLoading }
}