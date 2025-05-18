// backend/routes/reviews.js
import express from 'express';
import { 
  createProductReview, 
  getProductReviews, 
  deleteReview 
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products/:id/reviews - Get all reviews for a product
router.get('/:id/reviews', getProductReviews);

// POST /api/products/:id/reviews - Create/update a review (requires authentication)
router.post('/:id/reviews', protect, createProductReview);

// DELETE /api/products/:id/reviews/:reviewId - Delete a review (requires authentication)
router.delete('/:id/reviews/:reviewId', protect, deleteReview);

export default router;