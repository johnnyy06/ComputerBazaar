// backend/routes/search.js
import express from 'express';
import { 
  searchProducts, 
  getSearchSuggestions, 
  getPopularSearches 
} from '../controllers/searchController.js';

const router = express.Router();

// Search products
router.get('/', searchProducts);

// Get search suggestions for autocomplete
router.get('/suggestions', getSearchSuggestions);

// Get popular search terms
router.get('/popular', getPopularSearches);

export default router;