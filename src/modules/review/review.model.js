import mongoose from 'mongoose';
import Product from '../product/product.model.js';

const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true }
);


reviewSchema.statics.calcAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: '$product',
                avgRating: { $avg: '$rating' },
                ratingCount: { $sum: 1 },
            },
        },
    ]);

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRating.toFixed(1),
            ratingsQuantity: result[0].ratingCount,
        });
    } else {

        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};


reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRating(this.product);
});


reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await doc.constructor.calcAverageRating(doc.product);
    }
});

export default mongoose.model('Review', reviewSchema);