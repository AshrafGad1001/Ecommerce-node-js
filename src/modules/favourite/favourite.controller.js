import User from '../auth/auth.model.js';
import asyncHandler from '../../utils/asyncHandler.js';


export const addToFavourites = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { favourites: req.params.productId } }, 
        { new: true }
    ).populate('favourites', 'title price imageCover');

    res.status(200).json({ message: 'Added to Favourites', favourites: user.favourites });
});

// DELETE /favourites/:productId 
export const removeFromFavourites = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { favourites: req.params.productId } }, 
        { new: true }
    ).populate('favourites', 'title price imageCover');

    res.status(200).json({ message: 'Removed from Favourites', favourites: user.favourites });
});

// GET /favourites 
export const getFavourites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate('favourites', 'title price imageCover ratingsAverage');

    res.status(200).json({ message: 'Success', count: user.favourites.length, favourites: user.favourites });
});