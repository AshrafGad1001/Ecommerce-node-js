import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './src/modules/auth/auth.router.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-Commerce API 🛒' });
});

app.use('/auth', authRouter);

export default app;