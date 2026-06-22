import User from './auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../../utils/asyncHandler.js';
import redis from '../../config/redis.js';

const CACHE_KEY = 'all_users';
const CACHE_TTL = 86400;


export const getAllUsers = asyncHandler(async (req, res) => {

    const cached = await redis.get(CACHE_KEY);

    if (cached) {
        const data = JSON.parse(cached);
        return res.status(200).json({
            message: 'Users fetched successfully (............from cache.......................)',
            total: data.length,
            users: data,
        });
    }


    const users = await User.find().select('-password');


    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(users));

    res.status(200).json({
        message: 'Users fetched successfully (from DB 🗄️)',
        total: users.length,
        users,
    });
});

export const clearCache = asyncHandler(async (req, res) => {
    await redis.del('all_users');
    res.status(200).json({ message: 'Cache cleared ' });
});


// export const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.find().select('-password');
//     res.status(200).json({
//         message: 'Users fetched successfully',
//         total: users.length,
//         users,
//     });
// });


export const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json({ message: 'Register Success', user });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login Success', token });
});