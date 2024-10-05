import { Products, ProductsById } from "@/services/Products/products";
import { useQuery } from "@tanstack/react-query"

export const useProducts = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['PRODUCTS', id, page, limit, search],
        queryFn: async () => {
            return id ? await ProductsById(id) : await Products(page, limit, search)
        }
    })

    return { data, totalDocs: data?.products?.totalDocs, isLoading, ...rest }
}