import { StatusCodes } from 'http-status-codes';
import Order from '../models/order.js';
import Cart from '../models/cart.js';
import Attribute from "../models/attribute.js";

export const createOrder = async (req, res) => {
    const { items } = req.body;
    const isadmin = req.body.role == 'admin || staff';
    try {
        const order = new Order(req.body);
        const dataCart = await Cart.findOne({ userId: order.userId }).populate('products.productId').exec();
        if (!isadmin) {
            dataCart.products = dataCart.products.filter((item_cart) => {
                return !req.body.items.some((item_order) => {
                    if (item_cart.productId._id.toString() === item_order.productId.toString()) {
                        if (item_cart.status_checked) {
                            return true;
                        }
                        return false;
                    }
                })
            })
        }

        for (let i of items) {
            const attribute = await Attribute.findOne({
                productId: i.productId,
                color: i.color,
                'sizes.size': i.size,
            });
            if (!attribute) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy sản phẩm" });
            }
            console.log();
            for (let a of attribute.sizes) {
                if (a.size === i.size) {
                    if (a.stock < i.quantity) {
                        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Số lượng sản phẩm không đủ" });
                    }
                    a.stock -= i.quantity;
                }
            }
            await attribute.save();
        }
        await order.save();
        if (!isadmin) {
            await dataCart.save();
        }
        res.status(201).json(order);
    } catch (error) {
        console.log(error);

    }
}
export const get_order = async (req, res) => {
    const { _page = 1, _limit = 10, _status, _search } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 }
        }
        const query = {}
        if (_status) {
            query.status = _status;
        }
        if (_search) {
            query.orderNumber = { $regex: _search, $options: 'i' }
        }
        const data = await Order.paginate(query, options)
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
    const { _page = 1, _limit = 10, _status } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 }
        }
        const query = { userId }
        if (_status) {
            query.status = _status;
        }
        const data = await Order.paginate(query, options)
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng nào của người dùng" });
        }
        return res.status(StatusCodes.CREATED).json({ message: "Lấy dữ liệu đơn hàng của người dùng thành công", data });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
export const update_status = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const validStatuses = ['1', '2', '3', '4', '5', '6'];

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng" });
        }
        if (!validStatuses.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: `Trạng thái không hợp lệ. Các trạng thái hợp lệ: ${validStatuses.join(", ")}` });
        }
        order.status = status;
        order.statusHistory.push({
            status,
            time: new Date()
        });

        await order.save();

        return res.status(StatusCodes.OK).json({ message: "Cập nhật trạng thái đơn hàng thành công", order });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng",
            error: error.message
        });
    }
}
