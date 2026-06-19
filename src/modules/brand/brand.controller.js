import Brand from './brand.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');
    const image = req.file?.path || null;

    const brand = await Brand.create({ name, slug, image });
    res.status(201).json({ message: 'Brand Created', brand });
});

export const updateBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');

    const updateData = { name, slug };
    if (req.file) updateData.image = req.file.path;

    const brand = await Brand.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    res.status(200).json({ message: 'Brand Updated', brand });
});

export const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json({ message: 'Success', count: brands.length, brands });
});

export const getSingleBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Success', brand });
});

export const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Brand Deleted' });
});