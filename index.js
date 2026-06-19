import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './src/modules/auth/auth.router.js';
import errorHandler from './src/middleware/errorHandler.js';
import categoryRouter from './src/modules/category/category.router.js';
import subCategoryRouter from './src/modules/subcategory/subcategory.router.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome To ECommerce' });
});

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);


app.use(errorHandler);

export default app;