import instance from "@/configs/axios";


export const get_Voucher = async () => {
    try {
        const { data } = await instance.get('/voucher');
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const create_Voucher = async (voucher: any) => {
    try {
        const { data } = await instance.post('/voucher', voucher);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Đã xảy ra lỗi khi thêm voucher');
    }
}
export const delete_Voucher = async (id: any) => {
    try {
        const { data } = await instance.delete(`/voucher/${id}`);
        return data;
    } catch (error) {
        console.log(error);

    }
}