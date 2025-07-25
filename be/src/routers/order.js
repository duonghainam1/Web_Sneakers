import { Router } from "express";
import { createOrder, get_order, get_Order_ById, get_order_Id, update_status } from "../controllers/order.js";
import { verifyToken } from "../middleware/checkAuth.js";
const Router_order = Router();
Router_order.post('/order', verifyToken, createOrder)
Router_order.get('/order', verifyToken, get_order)
Router_order.get('/orders/:id', verifyToken, get_order_Id)
Router_order.get('/order/:userId', verifyToken, get_Order_ById)
Router_order.put('/order/:id/status', verifyToken, update_status)
export default Router_order;