import SubCategory from './subcategory.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

// POST /subcategories  OR  POST /categories/:categoryId/subcategories
export const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;


    const categoryId = req.params.categoryId || category;

    const slug = name.toLowerCase().replace(/ /g, '-');

    const subCategory = await SubCategory.create({ name, slug, category: categoryId });

    res.status(201).json({ message: 'SubCategory Created', subCategory });
});

// GET /subcategories  OR  GET /categories/:categoryId/subcategories
export const getAllSubCategories = asyncHandler(async (req, res) => {
    const filter = req.params.categoryId ? { category: req.params.categoryId } : {};

    const subCategories = await SubCategory.find(filter).populate('category', 'name');

    res.status(200).json({ message: 'Success', count: subCategories.length, subCategories });
});

// GET /subcategories/:id
export const getSingleSubCategory = asyncHandler(async (req, res) => {
    const subCategory = await SubCategory.findById(req.params.id).populate('category', 'name');

    if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json({ message: 'Success', subCategory });
});

// PUT /subcategories/:id
export const updateSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;

    const slug = name.toLowerCase().replace(/ /g, '-');

    const subCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { name, slug, category },
        { new: true }
    );

    if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json({ message: 'SubCategory Updated', subCategory });
});

// DELETE /subcategories/:id
export const deleteSubCategory = asyncHandler(async (req, res) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json({ message: 'SubCategory Deleted' });
});