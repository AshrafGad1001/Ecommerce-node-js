import Category from './category.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const slug = name.toLowerCase().replace(/ /g, '-');

    const category = await Category.create({ name, slug });

    res.status(201).json({ message: 'Category Created', category });
});

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({ message: 'Success', count: categories.length, categories });
});

export const getSingleCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Success', category });
});

export const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const slug = name.toLowerCase().replace(/ /g, '-');

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name, slug },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category Updated', category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category Deleted' });
});