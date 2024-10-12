import instance from "@/configs/axios"


export const add_Address = async (data: any) => {
    try {
        const res = await instance.post('/auth/create-address', data)
        return res.data
    } catch (error) {
        throw error
    }
}
export const update_isDefault = async (data: any) => {
    try {
        const res = await instance.patch('/auth/update-isDefault', data)
        return res.data
    } catch (error) {
        throw error
    }
}
export const delete_Address = async (data: any) => {
    try {
        const res = await instance.delete('/auth/delete-address', { data })
        return res.data
    } catch (error) {
        throw error
    }
}