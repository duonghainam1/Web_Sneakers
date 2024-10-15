import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Bạn cần phải đăng nhập" });
        }
        jwt.verify(token, "123456", async (error, decoded) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Token đã hết hạn" });
                }
                if (error.name === "JsonWebTokenError") {
                    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Token không hợp lệ" });
                }
            } else {
                const user = await User.findOne({ _id: decoded.userId });
                if (!user) {
                    return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy người dùng" });
                }
                if (user.role === "admin") {
                    req.user = user;
                    return next();
                } else if (user.role === "staff") {
                    const isGetMethod = req.method === "GET";
                    const isGetProduct = req.originalUrl.includes("/auth");
                    if (isGetMethod && isGetProduct) {
                        req.user = user;
                        next();
                    } else {
                        return res.status(StatusCodes.FORBIDDEN).json({ error: "Bạn không có quyền truy cập vào trang này" });
                    }
                    req.user = user;
                    return next();
                } else {
                    return res.status(StatusCodes.FORBIDDEN).json({ error: "Bạn không có quyền truy cập vào trang này" });
                }

            }
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Lỗi server" });
    }
};
