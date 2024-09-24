import instance from "@/configs/axios"

export const Category = async () => {
    try {
        const { data } = await instance.get('/category')
        return data;
    } catch (error) {
        console.log(error)

    }
}
export const CategoryById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/category/${id}`)
        return data;
    } catch (error) {
        console.log(error)

    }
}
export const Add_Category = async (category: any) => {
    try {
        const { data } = await instance.post('/category', category);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Đã xảy ra lỗi khi thêm danh mục');
    }
};
export const Detele_Category = async (id: string | number) => {
    try {
        const data = await instance.delete(`/category/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const Update_Category = async (category: any) => {
    try {
        const { data } = await instance.put(`/category/${category._id}`, category)
        return data;
    } catch (error) {
        console.log(error)
    }
}