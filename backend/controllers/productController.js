// server/controllers/productController.js
import { create } from 'domain';
import Product from '../models/ProductModel.js';

// @desc    Obține toate produsele
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Obține un singur produs
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produs negăsit' });
    }
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Adaugă un produs nou
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      brand,
      stock,
      rating,
      category,
      numReviews,
      reviews,
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image,
      brand,
      stock,
      rating,
      category,
      numReviews,
      reviews,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export controllerele
export { createProduct };
export { getProductById };
export { getProducts };