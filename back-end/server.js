import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
