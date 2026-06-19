import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        priceAfterDiscount: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        imageCover: {
            type: String,
            required: true,
        },
        images: [{ type: String }],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
        ratingsAverage: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);