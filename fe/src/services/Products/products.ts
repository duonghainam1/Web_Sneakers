import instance from "@/configs/axios";
export const Products = async (page: number, limit: number, search: string, category: string, size: string, color: string) => {
    try {
        const { data } = await instance.get(`/products?page=${page}&limit=${limit}&search=${search}&category=${category}&size=${size}&color=${color}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const ProductsById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/products/${id}`)
        return data;
    } catch (error) {
        console.log(error)

    }
}
export const Add_Products = async (products: any) => {
    try {
        const { data } = await instance.post('/products', products)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const Detele_Products = async (id: string | number) => {
    try {
        const data = await instance.delete(`/products/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const Update_Products = async (products: any) => {
    console.log(products);

    try {
        const { data } = await instance.patch(`/products/${products._id}`, products)
        return data;
    } catch (error) {
        console.log(error)
    }
}