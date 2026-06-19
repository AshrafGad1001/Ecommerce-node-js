import { Router } from 'express';
import {
    createBrand, getAllBrands,
    getSingleBrand, updateBrand, deleteBrand,
} from './brand.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';
import { uploadBrandImage } from '../../middleware/upload.middleware.js';

const router = Router();

router.route('/')
    .get(getAllBrands)
    .post(protect, allowTo('admin'), uploadBrandImage, createBrand);

router.route('/:id')
    .get(getSingleBrand)
    .put(protect, allowTo('admin'), uploadBrandImage, updateBrand)
    .delete(protect, allowTo('admin'), deleteBrand);

export default router;