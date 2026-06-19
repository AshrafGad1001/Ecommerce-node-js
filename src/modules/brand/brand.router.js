import { Router } from 'express';
import {
    createBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
} from './brand.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';

const router = Router();

router.route('/')
    .get(getAllBrands)
    .post(protect, allowTo('admin'), createBrand);

router.route('/:id')
    .get(getSingleBrand)
    .put(protect, allowTo('admin'), updateBrand)
    .delete(protect, allowTo('admin'), deleteBrand);

export default router;