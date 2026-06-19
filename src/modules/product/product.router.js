import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} from './product.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';
import { uploadProductImages } from '../../middleware/upload.middleware.js';

const router = Router();

router.route('/')
    .get(getAllProducts)
    .post(protect, allowTo('admin'), uploadProductImages, createProduct);

router.route('/:id')
    .get(getSingleProduct)
    .put(protect, allowTo('admin'), uploadProductImages, updateProduct)
    .delete(protect, allowTo('admin'), deleteProduct);

export default router;