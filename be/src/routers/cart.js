import { Router } from 'express';
import { addCart, delete_Cart, getCart, increase_Quantity, reduce_Quantity, update_status_checked, } from '../controllers/cart.js';
const Router_cart = Router();
Router_cart.get('/cart/:userId', getCart)
Router_cart.post('/cart', addCart)
Router_cart.delete('/cart/remove', delete_Cart)
Router_cart.put('/cart', update_status_checked)
Router_cart.post('/cart/increase', increase_Quantity)
Router_cart.post('/cart/reduce', reduce_Quantity)

export default Router_cart;