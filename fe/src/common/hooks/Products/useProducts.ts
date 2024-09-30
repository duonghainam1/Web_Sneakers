import { Products, ProductsById } from "@/services/Products/products";
import { useQuery } from "@tanstack/react-query"

export const useProducts = (id?: string | number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['PRODUCTS', id],
        queryFn: async () => {
            return id ? await ProductsById(id) : await Products()
        }
    })
    console.log(data);

    return { data, isLoading }
}