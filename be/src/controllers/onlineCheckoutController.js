import moment from "moment";
import crypto from "crypto";
import qs from "qs";
import express from "express";
import Order from "../models/order.js";
import Cart from '../models/cart.js';
import Attribute from "../models/attribute.js";
const app = express();
const tmnCode = "76Q18QBZ";
const secretKey = "CMFMW4TMIB2BSOILMO4FLWA1PILU718G";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:8080/api/v1/return";

function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    });
    return sorted;
}

export const createPaymentUrl = async (req, res, next) => {
    const { userId, orderId, items, customerInfo, totalPrice, payment } = req.body;
    const isadmin = req.body.role == 'admin || staff';

    const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const createDate = moment().format("YYYYMMDDHHmmss");
    const currCode = "VND";

    let vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `${orderId}`,
        vnp_OrderType: "other",
        vnp_Amount: totalPrice * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };
    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;
    const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;
    const newOrder = new Order({
        userId: userId,
        orderId: orderId,
        items: items,
        customerInfo: customerInfo,
        totalPrice: totalPrice,
        payment: payment,
    });
    const dataCart = await Cart.findOne({ userId: newOrder.userId }).populate('products.productId').exec();
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
    await newOrder.save();
    if (!isadmin) {
        await dataCart.save();
    }
    res.json({ paymentUrl });
}

// Hàm xử lý phản hồi từ VNPay
export function returnUrll(req, res, next) {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        const responseCode = vnp_Params['vnp_ResponseCode'];

        if (responseCode === '00') {
            const queryParams = qs.stringify(vnp_Params, { encode: false });
            res.redirect(`http://localhost:5173/thank-you`);
        } else if (responseCode === '01') {
            res.redirect('http://localhost:5173/that_bai?error=not_found');
        } else {
            res.redirect('http://localhost:5173/that_bai?error=not_found');
        }
    } else {
        res.redirect('http://localhost:5173/that_bai?error=not_found');
    }
}
