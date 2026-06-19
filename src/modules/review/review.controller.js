import Review from './review.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createReview = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const { productId } = req.params;


    const existingReview = await Review.findOne({
        user: req.user._id,
        product: productId,
    });

    if (existingReview) {
        return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await Review.create({
        comment,
        rating,
        user: req.user._id,
        product: productId,
    });

    res.status(201).json({ message: 'Review Created', review });
});

export const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
        .populate('user', 'name');

    res.status(200).json({ message: 'Success', count: reviews.length, reviews });
});

export const getSingleReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
        .populate('user', 'name');

    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.status(200).json({ message: 'Success', review });
});

export const updateReview = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;

    const review = await Review.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },  
        { comment, rating },
        { new: true }
    );

    if (!review) return res.status(404).json({ message: 'Review not found or not authorized' });


    await Review.calcAverageRating(review.product);

    res.status(200).json({ message: 'Review Updated', review });
});

export const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,   
    });

    if (!review) return res.status(404).json({ message: 'Review not found or not authorized' });

    res.status(200).json({ message: 'Review Deleted' });
});