import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db";

import authRouter from "./routers/auth";
import cartRouter from "./routers/cart";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import attributeRouter from "./routers/attribute";
import Router_order from "./routers/order";


const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", attributeRouter);
app.use("/api/v1", Router_order)

export const viteNodeApp = app;
