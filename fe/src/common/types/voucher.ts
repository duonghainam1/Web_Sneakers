export interface Voucher {
    _id: string;
    code_voucher: string;
    description?: string;
    discountType_voucher: "percent" | "fixed";
    discount_voucher: number;
    appliedProducts_voucher?: string;
    startDate_voucher: Date;
    usageLimit_voucher?: number;
    endDate_voucher: Date;
    minimumOrderValue_voucher?: number;
    maximumDiscount_voucher?: number;
    status_voucher: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}