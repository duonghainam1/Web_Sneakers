import instance from "@/configs/axios";

export const add_Size = async (data: any) => {
    try {
        const response = await instance.post("/size", data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const get_Size = async () => {
    try {
        const { data } = await instance.get("/size");
        return data;
    } catch (error) {
        console.error(error);
    }
}