import Product from './product.model.js';
import asyncHandler from '../../utils/asyncHandler.js';
import redis from '../../config/redis.js';




const ALL_PRODUCTS_KEY = 'all_products';
const PRODUCT_KEY = (id) => `product:${id}`;
const CACHE_TTL = 300;



// export const createProduct = asyncHandler(async (req, res) => {
//     const { title, description, price, priceAfterDiscount, quantity, category, subcategory, brand } = req.body;

//     const slug = title.trim().toLowerCase().replace(/ /g, '-');


//     const imageCover = req.files?.imageCover?.[0]?.path;
//     const images = req.files?.images?.map(file => file.path) || [];

//     const product = await Product.create({
//         title,
//         slug,
//         description,
//         price,
//         priceAfterDiscount,
//         quantity,
//         imageCover,
//         images,
//         category,
//         subcategory,
//         brand,
//     });

//     res.status(201).json({ message: 'Product Created', product });
// });

export const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, priceAfterDiscount, quantity, category, subcategory, brand } = req.body;

    const slug = title.trim().toLowerCase().replace(/ /g, '-');

    const imageCover = req.files?.imageCover?.[0]?.path;
    const images = req.files?.images?.map(file => file.path) || [];

    const product = await Product.create({
        title,
        slug,
        description,
        price,
        priceAfterDiscount,
        quantity,
        imageCover,
        images,
        category,
        subcategory,
        brand,
    });


    await redis.del(ALL_PRODUCTS_KEY);

    res.status(201).json({ message: 'Product Created', product });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.title) {
        updateData.slug = updateData.title.toLowerCase().replace(/ /g, '-');
    }
    if (req.files?.imageCover) {
        updateData.imageCover = req.files.imageCover[0].path;
    }
    if (req.files?.images) {
        updateData.images = req.files.images.map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });


    await redis.del(ALL_PRODUCTS_KEY);
    await redis.del(PRODUCT_KEY(id));

    res.status(200).json({ message: 'Product Updated', product });
});
export const getAllProducts = asyncHandler(async (req, res) => {

    const cached = await redis.get(ALL_PRODUCTS_KEY);
    if (cached) {
        const data = JSON.parse(cached);
        return res.status(200).json({
            message: 'Success',
            source: 'cache ..............................',
            count: data.length,
            products: data,
        });
    }


    const products = await Product.find()
        .populate('category', 'name')
        .populate('subcategory', 'name')
        .populate('brand', 'name');


    await redis.setex(ALL_PRODUCTS_KEY, CACHE_TTL, JSON.stringify(products));

    res.status(200).json({
        message: 'Success',
        source: 'Database',
        count: products.length,
        products,
    });
});
export const clearProductsCache = asyncHandler(async (req, res) => {
    await redis.del(ALL_PRODUCTS_KEY);
    res.status(200).json({ message: 'Products cache cleared ✅' });
});

// export const getAllProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find()
//         .populate('category', 'name')
//         .populate('subcategory', 'name')
//         .populate('brand', 'name');

//     res.status(200).json({ message: 'Success', count: products.length, products });
// });

export const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('category', 'name')
        .populate('subcategory', 'name')
        .populate('brand', 'name');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Success', product });
});

// export const updateProduct = asyncHandler(async (req, res) => {
//     const updateData = { ...req.body };

//     if (updateData.title) {
//         updateData.slug = updateData.title.toLowerCase().replace(/ /g, '-');
//     }
//     if (req.files?.imageCover) {
//         updateData.imageCover = req.files.imageCover[0].path;
//     }
//     if (req.files?.images) {
//         updateData.images = req.files.images.map(file => file.path);
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.status(200).json({ message: 'Product Updated', product });
// });

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product Deleted' });
});