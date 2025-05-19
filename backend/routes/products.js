// backend/routes/product.js
import express from 'express';
import { getProducts, getProductById, createProduct, getProductCountByCategory, getRecommendedProducts, getFilterOptions } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/category-counts', getProductCountByCategory);
router.get('/recommended', getRecommendedProducts);
router.get('/filter-options', getFilterOptions);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;