import { Router } from 'express';
import {
    createReview,
    getProductReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} from './review.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router({ mergeParams: true });

router.route('/')
    .get(getProductReviews)
    .post(protect, createReview);

router.route('/:id')
    .get(getSingleReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

export default router;