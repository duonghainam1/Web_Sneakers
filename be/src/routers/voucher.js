import { Router } from "express";
import { create_voucher } from "../controllers/voucher/create.js";
import { get_Voucher } from "../controllers/voucher/get.js";
import { delete_voucher } from "../controllers/voucher/delete.js";

const Router_Voucher = Router();
Router_Voucher.get("/voucher", get_Voucher)
Router_Voucher.post("/voucher", create_voucher)
Router_Voucher.delete("/voucher/:id", delete_voucher)
export default Router_Voucher;