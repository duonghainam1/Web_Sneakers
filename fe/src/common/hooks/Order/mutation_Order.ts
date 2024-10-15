import { add_Create, update_order } from "@/services/Order/order";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";
import { useNavigate } from "react-router-dom";
type Actions = "ADD" | 'UPDATE';
export const mutation_Order = (action: Actions, userRole?: String) => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClinet = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data_order: any) => {
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
                    if (userRole === "admin || staff") {
                        return
                    } else {
                        navigate('/thank-you')
                    }
                    break;

                default:
                    break;
            }
            queryClinet.invalidateQueries({
                queryKey: ['ORDER']
            })
        }
    })
    return { mutate, contextHolder, isPending }
}