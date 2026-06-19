import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 1,
            max: 100,
        },
        expireDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);