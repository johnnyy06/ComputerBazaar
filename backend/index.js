import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './config/db.js';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import addressRoutes from './routes/address.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import orderRoutes from './routes/orders.js';
import searchRoutes from './routes/search.js';

// folosire rute
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users/addresses', addressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', searchRoutes);

// Rută de bază pentru testare API
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// setare pentru a servii frontend-ul
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// toate rutele care nu sunt definite vor returna index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. You can access it at http://localhost:${PORT}`);
});