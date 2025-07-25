import { Router } from 'express';
import { addCart, delete_Cart, getCart, increase_Quantity, reduce_Quantity, update_status_checked, } from '../controllers/cart.js';
import { verifyToken } from '../middleware/checkAuth.js';
const Router_cart = Router();
Router_cart.get('/cart/:userId', verifyToken, getCart)
Router_cart.post('/cart', verifyToken, addCart)
Router_cart.delete('/cart/remove', verifyToken, delete_Cart)
Router_cart.put('/cart', verifyToken, update_status_checked)
Router_cart.post('/cart/increase', verifyToken, increase_Quantity)
Router_cart.post('/cart/reduce', verifyToken, reduce_Quantity)

export default Router_cart;