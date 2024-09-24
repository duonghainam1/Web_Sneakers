import { getAuth } from "@/services/Auth/auth"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['AUTH'],
        queryFn: async () => {
            return await getAuth()
        }
    })
    return { data, isLoading }
}