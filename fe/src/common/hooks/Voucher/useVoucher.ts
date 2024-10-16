import { get_Voucher } from "@/services/Voucher/voucher"
import { useQuery } from "@tanstack/react-query"

export const useVoucher = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["VOUCHER_KEY"],
        queryFn: async () => {
            return await get_Voucher()
        }
    })
    return { data, ...rest }
}