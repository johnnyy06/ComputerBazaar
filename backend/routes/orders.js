// backend/routes/orders.js
import express from 'express';
import { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  getMyOrders, 
  getOrders 
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Protect all order routes
router.use(protect);

// Routes
router.route('/')
  .post(createOrder)
  .get(isAdmin, getOrders);

router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

export default router;