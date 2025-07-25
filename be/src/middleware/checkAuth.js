import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const verifyToken = async (req, res, next) => {
    try {
        // Lấy token từ header hoặc cookie
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;
        const refreshToken = req.cookies.jwt || req.cookies.refreshToken || req.headers["refresh-token"];

        // Nếu không có token nào
        if (!token && !refreshToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Bạn cần phải đăng nhập" });
        }

        // Thử verify accessToken trước
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy người dùng" });
                }
                req.user = user;
                return next();
            } catch (error) {
                // Nếu accessToken lỗi, thử refreshToken
                if (!refreshToken) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access token không hợp lệ và không có refresh token" });
                }
            }
        }

        // Verify refreshToken nếu accessToken không có hoặc lỗi
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy người dùng" });
                }
                req.user = user;
                return next();
            } catch (error) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Refresh token không hợp lệ" });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra trong quá trình xác thực" });
    }
};