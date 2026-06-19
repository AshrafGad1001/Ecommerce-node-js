import { Router } from 'express';
import {
    createSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from './subcategory.controller.js';
import { protect, allowTo } from '../../middleware/auth.middleware.js';


const router = Router({ mergeParams: true });

router.route('/')
    .get(getAllSubCategories)
    .post(protect, allowTo('admin'), createSubCategory);

router.route('/:id')
    .get(getSingleSubCategory)
    .put(protect, allowTo('admin'), updateSubCategory)
    .delete(protect, allowTo('admin'), deleteSubCategory);

export default router;