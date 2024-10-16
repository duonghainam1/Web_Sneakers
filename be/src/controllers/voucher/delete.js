import Voucher from "../../models/voucher.js";
import { StatusCodes } from "http-status-codes";

export const delete_voucher = async (req, res) => {
    const { id } = req.params;
    try {
        const voucher = await Voucher.findById(id);
        if (!voucher) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy voucher" });
        }
        await Voucher.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({ message: "Xóa voucher thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}