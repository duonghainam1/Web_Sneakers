import { StatusCodes } from "http-status-codes";
import Voucher from "../../models/voucher.js";

export const get_Voucher = async (req, res) => {
    try {
        const currentDate = new Date();
        await Voucher.deleteMany({ endDate_voucher: { $lt: currentDate } });
        const voucher = await Voucher.find();
        const activeVoucher = [];
        const inactiveVoucher = [];

        voucher.forEach(voucher => {
            if (voucher.endDate_voucher < currentDate) {
                inactiveVoucher.push(voucher);
            } else {
                activeVoucher.push(voucher);
            }
        });

        return res.status(StatusCodes.OK).json({ voucher, activeVoucher, inactiveVoucher });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
