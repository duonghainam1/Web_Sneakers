import { StatusCodes } from 'http-status-codes';
import Order from '../models/order';
import Cart from '../models/cart';

export const createOrder = async (req, res) => {
    // const { userId } = req.body;
    try {
        const order = new Order(req.body);
        // const dataCart = await Cart.findOne({ userId }).populate('products.productId').exec();
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);

    }
}
export const get_order = async (req, res) => {
    try {
        const data = await Order.find()
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Lấy tất cả đơn hàng thành công" });
        }
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });

    }
}
export const get_order_Id = async (req, res) => {
    try {
        const data = await Order.findById(req.params.id)
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Lấy tất cả đơn hàng thành công" });
        }
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });

    }
}
export const get_Order_ById = async (req, res) => {
    const { userId } = req.params
    try {
        const data = await Order.find({ userId })
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng nào của người dùng" });
        }
        return res.status(StatusCodes.CREATED).json({ message: "Lấy dữ liệu đơn hàng của người dùng thành công", data });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}