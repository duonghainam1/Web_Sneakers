import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const voucherSchema = new mongoose.Schema({
    code_voucher: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    discountType_voucher: {
        type: String,
        required: true,
        enum: ["percent", "fixed"],
    },
    discount_voucher: {
        type: Number,
        required: true,
    },
    appliedProducts_voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    startDate_voucher: {
        type: Date,
        required: true,
    },
    usageLimit_voucher: {
        type: Number,
    },
    endDate_voucher: {
        type: Date,
        required: true,
    },
    minimumOrderValue_voucher: {
        type: Number,
        default: 0,
    },
    maximumDiscount_voucher: {
        type: Number,
    },
    status_voucher: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true, versionKey: false });
voucherSchema.plugin(mongoosePaginate);
export default mongoose.model("Vouchers", voucherSchema);