import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { signupSchema } from "../validate/signup_Schema.js";
import { createAccessToken, createRefreshToken } from "./token/accessToken.js";



export const getAuth = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có user nào" });
        }
        return res.status(StatusCodes.OK).json({
            user,
        });
    } catch (error) {
        console.log(error);

    }
}
export const getAuthById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
}
export const signup = async (req, res) => {
    const { email, password, name, avatar } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    console.log(error);
    if (error) {
        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });

    return res.status(StatusCodes.CREATED).json({
        user,
    });
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: "Email không tồn tại",
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: "Mật khẩu không chính xác",
        });
    }
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    });

    return res.status(StatusCodes.OK).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
        },
        accessToken,
    });
};
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0, path: "/" });
        return res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
};

export const refreshToken = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Bạn cần phải đăng nhập" });
        }
        let payload = null
        try {
            payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token không hợp lệ" });
        }
        const user = await User.findById(payload.userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy người dùng" });
        }
        const newAccessToken = createAccessToken(user);
        res.status(StatusCodes.OK).json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });

    }
}
export const updateRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, { role: req.body.role, }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
}
export const updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        return res.status(StatusCodes.OK).json({ user });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra lỗi" });
    }

}
