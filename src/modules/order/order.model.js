import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        shippingAddress: {
            street: String,
            city: String,
            phone: String,
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'card'],
            default: 'cash',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        coupon: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);