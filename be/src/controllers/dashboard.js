import { StatusCodes } from 'http-status-codes';
import Order from '../models/order.js';
// import User from '../models/user.js';
export const getRevenueStatisticsByDay = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const dataFilter = {}
        if (startDate && endDate) {
            dataFilter.createdAt = {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        }
        const order = await Order.find({
            status: { $in: ["6"] },
            ...dataFilter
        })
        const revenueByDay = {};

        order.forEach((item) => {
            const orderDate = new Date(item.createdAt).toLocaleDateString();
            if (!revenueByDay[orderDate]) {
                revenueByDay[orderDate] = {
                    total: 0,
                    totalOrder: 0
                }
            }
            revenueByDay[orderDate].total += item.totalPrice;
            revenueByDay[orderDate].totalOrder += 1;
        })
        return res.status(StatusCodes.OK).json({
            message: "Thống kê doanh thu thành công",
            revenueByDay,
            totalOrder: order.length,
            order
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
export const getMonthlyRevenueStatistics = async (req, res) => {
    try {
        const orders = await Order.find({ status: { $in: ["6"] } });
        const revenueByMonth = {};
        const currentYear = new Date().getFullYear();
        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ]
        orders.forEach((item) => {
            const month = new Date(item.createdAt).getMonth();
            const year = new Date(item.createdAt).getFullYear();
            if (year === currentYear) {
                if (!revenueByMonth[month]) {
                    revenueByMonth[month] = 0
                }
                revenueByMonth[month] += item.totalPrice;
            }
        })
        const result = months.map((monthName, index) => ({
            month: monthName,
            totalRevenue: revenueByMonth[index] || 0
        }))
        return res.status(StatusCodes.OK).json({
            message: "Thống kê doanh thu theo tháng thành công",
            data: result
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}