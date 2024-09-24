import instance from "@/configs/axios";

export const add_Color = async (data: any) => {
    try {
        const response = await instance.post("/color", data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const get_Color = async () => {
    try {
        const { data } = await instance.get("/color");
        return data;
    } catch (error) {
        console.error(error);
    }
}