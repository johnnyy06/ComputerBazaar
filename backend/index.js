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

// import rute
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

// folosire rute
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Rută de bază pentru testare API
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Configurare pentru servirea fișierelor frontend în producție
if (process.env.NODE_ENV === 'production') {
  // Setează folderul static - directorul unde se află build-ul React
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Toate rutele care nu sunt API redirecționează la aplicația React
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'src', 'index.html'));
  });
} else {
  // În dezvoltare, oferă un mesaj simplu
  app.get('/', (req, res) => {
    res.send('API este în modul de dezvoltare. Accesați aplicația frontend pe portul său separat.');
  });
}

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});