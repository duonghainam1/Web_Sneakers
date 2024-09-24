import { get_Cart } from "@/services/Cart/cart"
import { useQuery } from "@tanstack/react-query"

const useCart = (userId: string | number) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['CART', userId],
        queryFn: async () => {
            return await get_Cart(userId)
        }
    })
    return { data, isLoading, ...rest }
}
export default useCart