import { Router } from 'express';
import {
    createCategory, getAllCategories,
    getSingleCategory, updateCategory, deleteCategory,
} from './category.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';
import { uploadCategoryImage } from '../../middleware/upload.middleware.js';
import subCategoryRouter from '../subcategory/subcategory.router.js';

const router = Router();

router.use('/:categoryId/subcategories', subCategoryRouter);

router.route('/')
    .get(getAllCategories)
    .post(protect, allowTo('admin'), uploadCategoryImage, createCategory);

router.route('/:id')
    .get(getSingleCategory)
    .put(protect, allowTo('admin'), uploadCategoryImage, updateCategory)
    .delete(protect, allowTo('admin'), deleteCategory);

export default router;