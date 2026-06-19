import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

//Category 
const categoryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce/categories',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

// Brand
const brandStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce/brands',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

//Product
const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

// Export
export const uploadCategoryImage = multer({ storage: categoryStorage }).single('image');
export const uploadBrandImage = multer({ storage: brandStorage }).single('image');

export const uploadProductImages = multer({ storage: productStorage }).fields([
    { name: 'imageCover', maxCount: 1 }, 
    { name: 'images', maxCount: 10 },    
]);