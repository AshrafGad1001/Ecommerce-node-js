import { Router } from 'express';
import {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} from './category.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';
import subCategoryRouter from '../subcategory/subcategory.router.js';

const router = Router();

// Nested Route: GET /categories/:categoryId/subcategories
router.use('/:categoryId/subcategories', subCategoryRouter);

router.route('/')
    .get(getAllCategories)
    .post(protect, allowTo('admin'), createCategory);

router.route('/:id')
    .get(getSingleCategory)
    .put(protect, allowTo('admin'), updateCategory)
    .delete(protect, allowTo('admin'), deleteCategory);

export default router;