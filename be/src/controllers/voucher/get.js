import { StatusCodes } from "http-status-codes";
import Voucher from "../../models/voucher";

export const get_Voucher = async (req, res) => {
    try {
        const cunrentDate = new Date();
        const voucher = await Voucher.find();
        const activeVoucher = []
        const inactiveVoucher = []
        voucher.forEach(voucher => {
            if (voucher.endDate_voucher < cunrentDate) {
                inactiveVoucher.push(voucher)
            }
            else {
                activeVoucher.push(voucher)
            }
        })

        return res.status(StatusCodes.OK).json({ voucher, activeVoucher, inactiveVoucher });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}