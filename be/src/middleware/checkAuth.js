import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Bạn không có quyền truy cập vào trang này" });
        }
        jwt.verify(token, "123456", async (error, decoded) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Hết hạn token" });
                }
                if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({ error: "Token không hợp lệ" });
                }
            } else {
                const user = await User.findOne({ _id: decoded.userId });
                if (!user || (user.role !== "admin" && user.role !== "staff")) {
                    return res.status(403).json({ error: "Bạn không có quyền truy cập vào trang này" });
                }
                req.user = user;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Có lỗi xảy ra" });
    }
};
