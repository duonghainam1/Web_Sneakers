import instance from "@/configs/axios";

export const get_Atribute = async () => {
    try {
        const { data } = await instance.get("/attribute");
        return data;
    } catch (error) {
        console.error(error);
    }
}
export const get_AtributeById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/attribute/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}
export const add_Atribute = async (atribute: any) => {
    try {
        const { data } = await instance.post("/attribute", atribute);
        return data;
    } catch (error) {
        console.error(error);
    }
}
