import app from './index.js';
import connectDB from './src/config/db.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});