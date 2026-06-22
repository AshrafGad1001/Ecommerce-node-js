import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    clearProductsCache,
} from './product.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';
import { uploadProductImages } from '../../middleware/upload.middleware.js';
import reviewRouter from '../review/review.router.js';
import redis from '../../config/redis.js';

const router = Router();

// Nested Route: /products/:productId/reviews
router.use('/:productId/reviews', reviewRouter);

router.route('/')
    .get(getAllProducts)
    .post(protect, allowTo('admin'), uploadProductImages, createProduct);

router.route('/cache')
    .delete(protect, allowTo('admin'), clearProductsCache);

router.route('/:id')
    .get(getSingleProduct)
    .put(protect, allowTo('admin'), uploadProductImages, updateProduct)
    .delete(protect, allowTo('admin'), deleteProduct);

export default router;