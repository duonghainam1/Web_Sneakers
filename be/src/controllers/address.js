import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";


export const createAddress = async (req, res) => {
    const { userId, newAddress, setDefault } = req.body;
    try {
        const data = await User.findById(userId);
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        if (setDefault) {
            data.address.forEach((item) => {
                item.isDefault = false;
            });
        }
        const newAddressWithDefault = {
            ...newAddress[0],
            isDefault: setDefault || false
        };

        data.address.push(newAddressWithDefault);
        await data.save();
        return res.status(StatusCodes.OK).json({ data });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
};



export const updateIsDefault = async (req, res) => {
    const { userId, addressId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        const addressExists = user.address.some((item) => item._id.toString() === addressId);
        if (!addressExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy địa chỉ" });
        }
        user.address = user.address.map((item) => {
            item.isDefault = item._id.toString() === addressId;
            return item;
        });

        await user.save();
        return res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra 1" });
    }
}
export const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        const addressExists = user.address.some((item) => item._id.toString() === addressId);
        if (!addressExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy địa chỉ" });
        }
        user.address = user.address.filter((item) => item._id.toString() !== addressId);
        await user.save();
        return res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
}
