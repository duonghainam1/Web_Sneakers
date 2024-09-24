import { add_Create } from "@/services/Order/order";
import { useMutation } from "@tanstack/react-query"
import { message } from "antd";
type Actions = "ADD" | 'UPDATE';
export const mutation_Order = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data_order: any) => {
            switch (action) {
                case 'ADD':
                    return await add_Create(data_order)
                default:
                    return
            }
        },
        onSuccess: () => {
            switch (action) {
                case "ADD":
                    messageApi.open({
                        type: 'success',
                        content: 'Bạn đã đặt hành thành công',
                    });
                    break;

                default:
                    break;
            }
        }
    })
    return { mutate, contextHolder, isPending }
}