import express from 'express';
import { getProducts, getProductById, createProduct, getProductCountByCategory, getRecommendedProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/category-counts', getProductCountByCategory);
router.get('/recommended', getRecommendedProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;