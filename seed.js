import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './src/modules/auth/auth.model.js';

dotenv.config();

const TOTAL_USERS = 20000;
const BATCH_SIZE = 500;

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        console.log(' Cleared existing users');


        const adminHash = await bcrypt.hash('admin123', 10);
        const userHash = await bcrypt.hash('user123', 10);


        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminHash,
            role: 'admin',
            isVerified: true,
        });
        console.log('*********************Admin user created*********************');


        let totalInserted = 0;

        for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
            const batch = Array.from({ length: BATCH_SIZE }, (_, index) => ({
                name: `Test User ${i + index + 1}`,
                email: `user${i + index + 1}@example.com`,
                password: userHash,
                role: 'user',
                isVerified: true,
            }));

            await User.insertMany(batch);
            totalInserted += batch.length;
            console.log(`############   -   Inserted batch: ${totalInserted} / ${TOTAL_USERS}`);
        }

        console.log(`Seeded ${totalInserted + 1} users successfully`);

    } catch (error) {
        console.error('❌ Seed failed:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
};

seedUsers();