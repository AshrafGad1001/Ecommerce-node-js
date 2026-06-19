import Coupon from './coupon.model.js';
import Cart from '../cart/cart.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

//  Admin CRUD

export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, expireDate } = req.body;

    const coupon = await Coupon.create({ code, discount, expireDate });

    res.status(201).json({ message: 'Coupon Created', coupon });
});

export const getAllCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();

    res.status(200).json({ message: 'Success', count: coupons.length, coupons });
});

export const getSingleCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    res.status(200).json({ message: 'Success', coupon });
});

export const updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    res.status(200).json({ message: 'Coupon Updated', coupon });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    res.status(200).json({ message: 'Coupon Deleted' });
});

//  User: Apply Coupon 

export const applyCoupon = asyncHandler(async (req, res) => {
    const { code } = req.body;


    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
        return res.status(404).json({ message: 'Invalid Coupon' });
    }

    if (coupon.expireDate < Date.now()) {
        return res.status(400).json({ message: 'Coupon Expired' });
    }


    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });


    const discount = coupon.discount / 100;
    const totalPriceAfterDiscount = (cart.totalPrice - cart.totalPrice * discount).toFixed(2);

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cart.coupon = coupon.code;
    await cart.save();

    res.status(200).json({
        message: 'Coupon Applied',
        totalPrice: cart.totalPrice,
        discount: `${coupon.discount}%`,
        totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
    });
});