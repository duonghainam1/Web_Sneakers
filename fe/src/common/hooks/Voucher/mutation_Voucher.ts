import { create_Voucher, delete_Voucher } from "@/services/Voucher/voucher";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd";

type Action = 'ADD' | 'UPDATE' | 'DELETE';

export const mutation_Voucher = (actions: Action) => {
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate } = useMutation({
        mutationFn: async (voucher: any) => {
            switch (actions) {
                case "ADD":
                    return await create_Voucher(voucher)
                case "UPDATE":
                case "DELETE":
                    return await delete_Voucher(voucher)
                default:
                    return null
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['VOUCHER_KEY']
            })
            switch (actions) {
                case "ADD":
                    message.open({
                        type: 'success',
                        content: 'Thêm voucher thành công',
                    });
                    break;
                case "UPDATE":
                    messageApi.open({
                        type: 'success',
                        content: 'Cập nhật voucher thành công',
                    });
                    break;
                case "DELETE":
                    messageApi.open({
                        type: 'success',
                        content: 'Xóa voucher thành công',
                    });
                    break;
                default:
            }
        }
    })
    return { mutate, contextHolder }
}