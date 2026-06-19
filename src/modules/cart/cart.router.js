import { Router } from 'express';
import {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
} from './cart.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.route('/')
    .get(getCart)
    .post(addToCart)
    .delete(clearCart);

router.route('/:itemId')
    .put(updateCartItemQuantity)
    .delete(removeFromCart);

export default router;