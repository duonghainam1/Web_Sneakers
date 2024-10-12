import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        phone: {
            type: String,
        },
        address: [
            {
                userName: { type: String, required: true },
                phone: { type: String, required: true },
                address: { type: String, required: true },
                address_detail: { type: String, required: true },
                isDefault: { type: Boolean, default: false },
            }
        ],
        role: {
            type: String,
            enum: ["user", "admin", "staff"],
            default: "user",
        },
        avatar: {
            type: String,
            default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
