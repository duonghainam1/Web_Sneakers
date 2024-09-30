import { StatusCodes } from 'http-status-codes';
import Cart from '../models/cart.js';
import Attribute from '../models/attribute.js';
import Product from '../models/product.js';
export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.find({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào" });
        }
        return res.status(StatusCodes.OK).json({
            cart,
        });
    } catch (error) {
        console.log(error);
    }
}

export const addCart = async (req, res) => {
    const { productId, userId, quantity, size, color, status_checked } = req.body;
    try {
        if (!productId || !userId || quantity <= 0 || !size || !color) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Dữ liệu không hợp lệ" });
        }
        const attribute = await Attribute.findOne({ productId, color });
        if (!attribute) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Kích thước, màu sắc không hợp lệ hoặc sản phẩm không tồn tại" });
        }
        let sizeAttribute = attribute.sizes.find(a => a.size === size);
        if (!sizeAttribute) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Kích thước không hợp lệ" });
        }
        const price_item = sizeAttribute.price;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity, total_price_item: price_item * quantity, size, color, status_checked }],
                total_price: price_item * quantity
            });
            return res.status(StatusCodes.CREATED).json(newCart);
        }
        const productIndex = cart.products.findIndex(item =>
            item.productId.toString() === productId.toString() &&
            item.size === size &&
            item.color === color
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
            cart.products[productIndex].total_price_item = sizeAttribute.price * cart.products[productIndex].quantity;
        } else {
            cart.products.push({
                productId,
                quantity,
                total_price_item: price_item * quantity,
                size,
                color,
                status_checked
            });
        }
        cart.total_price = cart.products.reduce((total, item) => total + item.total_price_item, 0);
        await cart.save();
        return res.status(StatusCodes.OK).json({
            message: 'Sản phẩm đã được thêm vào giỏ hàng',
            cart
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra trong quá trình xử lý" });
    }
};
export const delete_Cart = async (req, res) => {
    const { userId, productId, size, color } = req.body;
    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }
        const productIndex = cart.products.findIndex(item =>
            item.productId.toString() === productId.toString() &&
            item.size === size &&
            item.color === color
        );
        if (!productIndex) {
            return res.status(400).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng.' });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng.' });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi hệ thống. Vui lòng thử lại.', error: error.message });
    }
}
export async function update_status_checked(req, res) {
    const { userId, productId, color, size } = req.body;
    try {
        const data_cart = await Cart.findOne({ userId });

        if (!data_cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Giỏ hàng không tìm thấy!"
            });
        }

        let updated = false;

        for (let item of data_cart.products) {
            if (item.productId.toString() === productId._id.toString()) {
                if ((color && size && item.color === color && item.size === size) ||
                    (color && !size && item.color === color) ||
                    (!color && size && item.size === size)) {
                    item.status_checked = !item.status_checked;
                    updated = true;
                }
            }
        }

        if (updated) {
            await data_cart.save();
            return res.status(StatusCodes.OK).json({
                message: "Cập nhật trạng thái thành công!",
                data_cart
            });
        } else {
            return res.status(StatusCodes.NOT_MODIFIED).json({
                message: "Không có thay đổi nào được thực hiện!"
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi xảy ra, vui lòng thử lại!"
        });
    }
}

