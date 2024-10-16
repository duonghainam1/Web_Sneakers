import { StatusCodes } from "http-status-codes";
import Voucher from "../../models/voucher.js"
export const create_voucher = async (req, res) => {
    const { code_voucher, description, discountType_voucher, appliedProducts_voucher, discount_voucher, startDate_voucher, usageLimit_voucher, endDate_voucher, minimumOrderValue_voucher, maximumDiscount_voucher, status_voucher } = req.body;
    try {
        if (!code_voucher || !discountType_voucher || !discount_voucher || !startDate_voucher || !endDate_voucher || !status_voucher === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Vui lòng nhập đủ thông tin" });
        }
        if (discountType_voucher !== "percent" && discountType_voucher !== "fixed") {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "DiscountType không hợp lệ" });
        }
        const voucherExists = await Voucher.findOne({ code_voucher });
        if (voucherExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Mã voucher đã tồn tại" });
        }
        const startDate = new Date(startDate_voucher);
        const endDate = new Date(endDate_voucher)
        if (startDate >= endDate) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc" });
        }
        const newVoucher = new Voucher({
            code_voucher,
            description,
            discountType_voucher,
            discount_voucher,
            appliedProducts_voucher,
            startDate_voucher,
            usageLimit_voucher,
            endDate_voucher,
            minimumOrderValue_voucher,
            maximumDiscount_voucher,
            status_voucher
        });
        await newVoucher.save();
        return res.status(StatusCodes.CREATED).json(newVoucher);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
} 