// vnpayController.js – Fixed implementation
// ------------------------------------------------------------
// Các thay đổi chính:
// 1. Thêm vnp_SecureHashType="SHA512" khi tạo URL và khi xác thực tại returnUrl.
// 2. Khắc phục phép so sánh role admin/staff.
// 3. Bổ sung StatusCodes để trả về mã lỗi chính xác.
// 4. Bổ sung log chi tiết signData & secureHash để thuận tiện debug.
// 5. Chuẩn hoá cú pháp & comment rõ ràng.
// ------------------------------------------------------------

import moment from "moment";
import crypto from "crypto";
import qs from "qs";
import express from "express";
import { StatusCodes } from "http-status-codes";

import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Attribute from "../models/attribute.js";

// const app = express();

// Thông tin cấu hình VNPAY (sandbox)
const tmnCode = "BVI51IVB";
const secretKey = "GPZ2KEJMX6LNLRBK4DRRQXO0CB7N8XNN";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:8080/api/v1/return";

// Sắp xếp object tăng dần (A-Z)
function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
}

// ------------------------------------------------------------
// Tạo URL thanh toán VNPAY
// ------------------------------------------------------------
export const createPaymentUrl = async (req, res, next) => {
    try {
        const { userId, orderId, items, customerInfo, totalPrice, payment, role } = req.body;

        const isAdmin = ["admin", "staff"].includes(role);

        const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const createDate = moment().format("YYYYMMDDHHmmss");
        const currCode = "VND";

        // 1. Chuẩn bị tham số theo đúng spec VNPAY
        let vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: currCode,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `${orderId}`,
            vnp_OrderType: "other",
            vnp_Amount: Math.round(Number(totalPrice) * 100), // *100 theo yêu cầu VNPAY
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        vnp_Params = sortObject(vnp_Params);

        // 2. Sinh chữ ký SHA512
        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        // 3. Gắn chữ ký & thuật toán
        vnp_Params["vnp_SecureHash"] = signed;
        vnp_Params["vnp_SecureHashType"] = "SHA512";

        // 4. Tạo payment URL
        const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;

        // Log để kiểm tra khi cần
        console.log("[VNPAY] signData:", signData);
        console.log("[VNPAY] secureHash:", signed);
        console.log("[VNPAY] paymentUrl:", paymentUrl);

        // 5. Tạo Order & cập nhật giỏ hàng
        const newOrder = new Order({
            userId,
            orderId,
            items,
            customerInfo,
            totalPrice,
            payment,
        });

        // Lấy giỏ hàng hiện tại (đã populate productId)
        const dataCart = await Cart.findOne({ userId }).populate("products.productId").exec();

        // Nếu không phải admin → xoá sản phẩm đã mua khỏi giỏ
        if (!isAdmin && dataCart) {
            dataCart.products = dataCart.products.filter(item_cart => {
                return !items.some(item_order => {
                    const sameProduct = item_cart.productId._id.toString() === item_order.productId.toString();
                    return sameProduct && item_cart.status_checked;
                });
            });
            await dataCart.save();
        }

        // Trừ tồn kho Attribute
        for (const i of items) {
            const attribute = await Attribute.findOne({
                productId: i.productId,
                color: i.color,
                "sizes.size": i.size,
            });
            if (!attribute) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy sản phẩm" });
            }
            const sizeRow = attribute.sizes.find(s => s.size === i.size);
            if (!sizeRow || sizeRow.stock < i.quantity) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Số lượng sản phẩm không đủ" });
            }
            sizeRow.stock -= i.quantity;
            await attribute.save();
        }

        await newOrder.save();

        // 6. Trả về URL thanh toán cho FE
        return res.status(StatusCodes.OK).json({ paymentUrl });
    } catch (err) {
        console.error("[VNPAY][createPaymentUrl]", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi tạo URL thanh toán" });
    }
};

// ------------------------------------------------------------
// Xử lý redirect từ VNPAY về (Return URL)
// ------------------------------------------------------------
export const returnUrll = (req, res, next) => {
    try {
        // Clone query để tránh mutate trực tiếp
        let vnp_Params = { ...req.query };

        const secureHash = vnp_Params["vnp_SecureHash"];
        const secureHashType = vnp_Params["vnp_SecureHashType"];

        // Bỏ 2 trường chữ ký trước khi ký lại
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac(secureHashType.toLowerCase(), secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        // So sánh chữ ký
        if (secureHash === signed) {
            const responseCode = vnp_Params["vnp_ResponseCode"];
            console.log("[VNPAY][return] responseCode:", responseCode);

            if (responseCode === "00") {
                return res.redirect("http://localhost:5173/thank-you");
            }
            // Tất cả mã lỗi còn lại redirect về thất bại, truyền mã lỗi để FE hiển thị
            return res.redirect(`http://localhost:5173/that_bai?error=${responseCode}`);
        }
        // Checksum sai → chuyển thẳng trang lỗi chung
        return res.redirect("http://localhost:5173/that_bai?error=checksum_failed");
    } catch (err) {
        console.error("[VNPAY][returnUrll]", err);
        return res.redirect("http://localhost:5173/that_bai?error=server_exception");
    }
};

// ------------------------------------------------------------
// (Optional) Export router nếu muốn mount trực tiếp
// ------------------------------------------------------------
// app.post('/api/v1/payment', createPaymentUrl);
// app.get('/api/v1/return', returnUrll);

// export default app;
