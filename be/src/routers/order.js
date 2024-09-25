import { Router } from "express";
import { createOrder, get_order, get_Order_ById, get_order_Id } from "../controllers/order";
const Router_order = Router();
Router_order.post('/order', createOrder)
Router_order.get('/order', get_order)
Router_order.get('/orders/:id', get_order_Id)
Router_order.get('/order/:userId', get_Order_ById)
export default Router_order;