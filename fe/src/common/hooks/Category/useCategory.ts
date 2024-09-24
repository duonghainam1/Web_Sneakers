import { Category, CategoryById } from "@/services/Category/category";
import { useQuery } from "@tanstack/react-query"

export const useCategory = (id?: string | number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['CATEGORY', id],
        queryFn: async () => {
            return id ? await CategoryById(id) : await Category()
        }
    })
    return { data, isLoading }
}