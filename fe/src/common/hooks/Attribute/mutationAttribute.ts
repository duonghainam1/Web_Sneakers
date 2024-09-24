import { add_Atribute } from "@/services/Attributes/attributes";
import { add_Color } from "@/services/Attributes/color";
import { add_Size } from "@/services/Attributes/size";
import { useMutation } from "@tanstack/react-query"
import { message } from "antd";
type Actions = 'ADD' | 'UPDATE' | 'DELETE' | 'ADD_SIZE' | 'UPDATE_SIZE' | 'DELETE_SIZE' | 'ADD_COLOR' | 'UPDATE_COLOR' | 'DELETE_COLOR';

export const mutationAttribute = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            switch (action) {
                case "ADD":
                    return await add_Atribute(data)
                case "ADD_SIZE":
                    return await add_Size(data)
                case "ADD_COLOR":
                    return await add_Color(data)
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Thành công',
            })
        }
    })
    return { mutate, contextHolder }
}