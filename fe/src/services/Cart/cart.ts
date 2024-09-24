import instance from "@/configs/axios"

export const add_To_Cart = async (cart: any) => {
    try {
        const { data } = await instance.post(`/cart`, cart)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const get_Cart = async (userId: string | number) => {
    try {
        const res = await instance.get(`/cart/${userId}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const delete_Cart = async (userId: string | number, productId: number | string) => {
    try {
        const { data } = await instance.delete(`/cart/${userId}/${productId}`)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const update_Cart_status = async (cart: any) => {
    try {
        const { data } = await instance.put(`/cart`, cart)
        return data
    } catch (error) {
        console.log(error);
    }
}