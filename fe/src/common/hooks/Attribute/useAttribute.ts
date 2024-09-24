import { get_Atribute, get_AtributeById } from "@/services/Attributes/attributes"
import { useQuery } from "@tanstack/react-query"

export const useAttribute = (id?: string | number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['ATTRIBUTE', id],
        queryFn: async () => {
            return id ? await get_AtributeById(id) : await get_Atribute()
        }
    })
    return { data, isLoading }
}