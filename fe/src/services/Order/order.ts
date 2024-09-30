import instance from "@/configs/axios";

export const add_Create = async (data_order: any) => {
    try {
        const data = await instance.post('/order', data_order)
        return data
    } catch (error) {
        console.log(error);

    }
}
export const get_order = async () => {
    try {
        const data = await instance.get(`/order`)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const get_order_byId = async (id: number | string) => {
    try {
        const { data } = await instance.get(`/orders/${id}`)

        return data
    } catch (error) {
        console.log(error);

    }
}
export const get_order_byUser = async (userId: number | string) => {
    try {
        const { data } = await instance.get(`/order/${userId}`)
        return data
    } catch (error) {
        console.log(error);

    }
}
export const update_order = async (id: number | string, status: any) => {
    try {
        const data = await instance.put(`/order/${id}/status`, { status })
        return data
    } catch (error) {
        console.log(error);

    }
}