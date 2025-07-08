// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser()); // Use

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.listen(port, () => console.log(`Server running on port ${port}`));