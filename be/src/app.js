import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routers/auth.js";
import cartRouter from "./routers/cart.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import attributeRouter from "./routers/attribute.js";
import Router_order from "./routers/order.js";
import Router_Dashboard from "./routers/dashboard.js";
import Router_Voucher from "./routers/voucher.js";
import Router_OnlPayment from "./routers/paymentOnl.js";


const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(morgan("tiny"));
app.use(cookieParser());

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", attributeRouter);
app.use("/api/v1", Router_order)
app.use("/api/v1", Router_Dashboard)
app.use("/api/v1", Router_Voucher)
app.use("/api/v1", Router_OnlPayment)


// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })
export const viteNodeApp = app;

