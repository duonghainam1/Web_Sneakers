import instance from "@/configs/axios";

export const getRevenueStatisticsByDay = async () => {
    try {
        const { data } = await instance.get('/dashboard/revenue-statistics-by-day');
        return data;
    } catch (error) {
        console.log('Failed to fetch revenue statistics by day: ', error);

    }
}
export const getRevenueStatisticsByMonth = async () => {
    try {
        const { data } = await instance.get('/dashboard/month');
        return data;
    } catch (error) {
        console.log('Failed to fetch revenue statistics by month: ', error);

    }
}
export const get_order_limit = async () => {
    try {
        const { data } = await instance.get('/dashboard/get_order_limit');
        return data;
    } catch (error) {
        console.log('Failed to fetch order limit: ', error);

    }
}