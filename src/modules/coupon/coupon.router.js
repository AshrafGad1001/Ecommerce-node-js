import { Router } from 'express';
import {
    createCoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon,
    applyCoupon,
} from './coupon.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';

const router = Router();

//  User: Apply Coupon
router.post('/apply', protect, applyCoupon);

//  Admin CRUD
router.route('/')
    .get(protect, allowTo('admin'), getAllCoupons)
    .post(protect, allowTo('admin'), createCoupon);

router.route('/:id')
    .get(protect, allowTo('admin'), getSingleCoupon)
    .put(protect, allowTo('admin'), updateCoupon)
    .delete(protect, allowTo('admin'), deleteCoupon);

export default router;