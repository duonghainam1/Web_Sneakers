import { add_Create, update_order } from "@/services/Order/order";
import { useMutation } from "@tanstack/react-query"
import { message } from "antd";
type Actions = "ADD" | 'UPDATE';
export const mutation_Order = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data_order: any) => {
            console.log(data_order);

            switch (action) {
                case 'ADD':
                    return await add_Create(data_order)
                case 'UPDATE':
                    return await update_order(data_order.id, data_order.status)
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