import Order from './order.model.js';
import Cart from '../cart/cart.model.js';
import Product from '../product/product.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

//  User: Create Order 
export const createCashOrder = asyncHandler(async (req, res) => {
    const { shippingAddress } = req.body;


    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });


    const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;


    const order = await Order.create({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress,
        paymentMethod: 'cash',
        totalPrice,
        coupon: cart.coupon || null,
    });
    const bulkOptions = cart.cartItems.map(item => ({
        updateOne: {
            filter: { _id: item.product },
            update: {
                $inc: {
                    sold: item.quantity,
                    quantity: -item.quantity,
                },
            },
        },
    }));
    await Product.bulkWrite(bulkOptions);


    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({ message: 'Order Created', order });
});

//  User: Get My Orders 
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate('orderItems.product', 'title imageCover price');

    res.status(200).json({ message: 'Success', count: orders.length, orders });
});

//  Admin: Get All Orders 
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'name email')
        .populate('orderItems.product', 'title price');

    res.status(200).json({ message: 'Success', count: orders.length, orders });
});

// //  Admin: Update Order To Paid
// export const updateOrderToPaid = asyncHandler(async (req, res) => {
//     const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { isPaid: true, paidAt: Date.now() },
//         { new: true }
//     );

//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     res.status(200).json({ message: 'Order Updated To Paid', order });
// });

// //  Admin: Update Order To Delivered 
// export const updateOrderToDelivered = asyncHandler(async (req, res) => {
//     const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { isDelivered: true, deliveredAt: Date.now() },
//         { new: true }
//     );

//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     res.status(200).json({ message: 'Order Updated To Delivered', order });
// });