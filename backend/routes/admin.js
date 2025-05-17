// backend/routes/admin.js
import express from 'express';
import { isAdmin } from '../middleware/adminMiddleware.js';

// Import controllers
import {
  getAllUsers,
  deleteUser,
  getAdminDashboardStats,
  getTopCustomers
} from '../controllers/adminController.js';

import {
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controllers/adminOrderController.js';

const router = express.Router();

// Protect all admin routes with admin middleware
router.use(isAdmin);

// Dashboard stats
router.get('/dashboard', getAdminDashboardStats);
router.get('/dashboard/top-customers', getTopCustomers);

// User management routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Product management routes
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order management routes
router.get('/orders', getAllOrders);
router.get('/orders/stats', getOrderStats);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

export default router;