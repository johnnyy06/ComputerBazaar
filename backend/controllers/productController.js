// backend/controllers/productController.js
import Product from '../models/ProductModel.js';
import { deleteImage } from '../config/cloudinary.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    
    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
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

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      images,
      brand,
      category,
      stock,
      specifications
    } = req.body;

    // Validate required fields
    if (!name || !price || !description || !images || !brand || !category) {
      return res.status(400).json({
        message: 'Toate câmpurile obligatorii trebuie completate'
      });
    }

    // Ensure images is an array
    const productImages = Array.isArray(images) ? images : [images];

    const product = new Product({
      name,
      price,
      description,
      images: productImages,
      brand,
      category,
      stock: stock || 0,
      rating: 0,
      numReviews: 0,
      specifications: specifications || {}
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      images,
      brand,
      category,
      stock,
      specifications
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produs negăsit' });
    }

    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    
    // Update images if provided
    if (images) {
      product.images = Array.isArray(images) ? images : [images];
    }
    
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    
    // Handle specifications (which is a Map)
    if (specifications) {
      // Clear existing specifications if empty object provided
      if (Object.keys(specifications).length === 0) {
        product.specifications = new Map();
      } else {
        // Update specifications
        Object.entries(specifications).forEach(([key, value]) => {
          product.specifications.set(key, value);
        });
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produs negăsit' });
    }

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(image => {
        if (image.publicId) {
          return deleteImage(image.publicId);
        }
        return Promise.resolve();
      });

      await Promise.all(deletePromises);
    }

    // Delete the product
    await product.deleteOne();
    
    res.json({ message: 'Produsul a fost șters' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};