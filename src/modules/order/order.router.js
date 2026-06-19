import { Router } from 'express';
import {
    createCashOrder,
    getMyOrders,
    getAllOrders,
    // updateOrderToPaid,
    // updateOrderToDelivered,
} from './order.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';

const router = Router();

//  User 
router.post('/', protect, createCashOrder);
router.get('/my-orders', protect, getMyOrders);

//  Admin 
router.get('/', protect, allowTo('admin'), getAllOrders);
// router.put('/:id/pay', protect, allowTo('admin'), updateOrderToPaid);
// router.put('/:id/deliver', protect, allowTo('admin'), updateOrderToDelivered);

export default router;