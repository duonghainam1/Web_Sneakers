import { getAuth, getUserById } from "@/services/Auth/auth"
import { useQuery } from "@tanstack/react-query"

export const useAuth = (userId?: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['AUTH', userId],
        queryFn: async () => {
            return userId ? await getUserById(userId) : await getAuth()
        }
    })
    return { data, isLoading }
}