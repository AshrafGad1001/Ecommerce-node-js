import { Router } from 'express';
import {
    addToFavourites,
    removeFromFavourites,
    getFavourites,
} from './favourite.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(protect); 
router.route('/')
    .get(getFavourites);

router.route('/:productId')
    .post(addToFavourites)
    .delete(removeFromFavourites);

export default router;