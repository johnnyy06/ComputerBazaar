import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import rute
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

// folosire rute
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Pentru producție: servește fișierele statice React
if (process.env.NODE_ENV === 'production') {
  // Setează folderul static
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Toate rutele necunoscute duc la index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Rută de bază pentru testare
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

