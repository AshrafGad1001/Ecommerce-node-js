import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../modules/auth/auth.model.js';

export const protect = asyncHandler(async (req, res, next) => {
    //Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    //Attach user to request
    req.user = user;

    next();
});

export const allowTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not allowed to access this EndPoint ' });
        }
        next();
    };
};