import { Products, ProductsById } from "@/services/Products/products";
import { useQuery } from "@tanstack/react-query"

export const useProducts = (id?: string | number, page: number = 1, limit: number = 12, search: string = "", category?: string, size?: string, color?: string) => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['PRODUCTS', id, page, limit, search, category, size, color],
        queryFn: async () => {
            return id ? await ProductsById(id) : await Products(page, limit, search, category || "", size || "", color || "");
        }
    })

    return { data, totalDocs: data?.products?.totalDocs, isLoading, ...rest }
}