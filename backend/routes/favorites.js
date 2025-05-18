// backend/routes/favorites.js
import express from 'express';
import { 
  addToFavorites, 
  removeFromFavorites, 
  getFavorites,
  checkFavorite
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected - require authentication
router.use(protect);

// POST /api/favorites - Add product to favorites
router.post('/', addToFavorites);

// DELETE /api/favorites/:productId - Remove product from favorites
router.delete('/:productId', removeFromFavorites);

// GET /api/favorites - Get user's favorites
router.get('/', getFavorites);

// GET /api/favorites/:productId - Check if product is in favorites
router.get('/:productId', checkFavorite);

export default router;