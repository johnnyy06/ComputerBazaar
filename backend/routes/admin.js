// backend/routes/admin.js
import express from 'express';
import { isAdmin } from '../middleware/adminMiddleware.js';

// Import controllers
import {
  getAllUsers,
  deleteUser,
  getAdminDashboardStats,
} from '../controllers/adminController.js';

import {
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Protect all admin routes with admin middleware
router.use(isAdmin);

// Dashboard stats
router.get('/dashboard', getAdminDashboardStats);

// User management routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Product management routes
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;