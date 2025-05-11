// backend/controllers/productController.js
import Product from '../models/ProductModel.js';
import { deleteImage } from '../config/cloudinary.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    
    // Build filter object
    const filters = {};
    
    // Add keyword filter if provided
    if (req.query.keyword) {
      filters.name = {
        $regex: req.query.keyword,
        $options: 'i', // case-insensitive
      };
    }
    
    // Add category filter if provided
    if (req.query.category) {
      filters.category = {
        $regex: req.query.category,
        $options: 'i', // case-insensitive
      };
    }

    if (req.query.brands) {
      const brandsArray = Array.isArray(req.query.brands) 
        ? req.query.brands 
        : req.query.brands.split(',');
      filters.brand = { $in: brandsArray };
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) {
        filters.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filters.price.$lte = Number(req.query.maxPrice);
      }
    }
    
    if (req.query.inStock === 'true') {
      filters.stock = { $gt: 0 };
    }
    
    if (req.query.attributes) {
      const attributes = JSON.parse(req.query.attributes);
      for (const [key, values] of Object.entries(attributes)) {
        if (values.length > 0) {
          filters[`specifications.${key}`] = { $in: values };
        }
      }
    }
    
    // Count total products matching filters
    const count = await Product.countDocuments(filters);

    // Build sort object
    let sortOptions = {};
    switch (req.query.sortBy) {
      case 'price_asc':
        sortOptions = { price: 1 };
        break;
      case 'price_desc':
        sortOptions = { price: -1 };
        break;
      case 'name_asc':
        sortOptions = { name: 1 };
        break;
      case 'name_desc':
        sortOptions = { name: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }
    
    // Get products with pagination
    const products = await Product.find(filters)
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

// @desc    Advanced filtering options for products
// @route   GET /api/products/filter-options
// @access  Public
export const getFilterOptions = async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    // Get unique brands for the category
    const brands = await Product.distinct('brand', query);
    
    // Get price range
    const priceRange = await Product.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    
    // Get unique specifications (attributes)
    const specificationsKeys = await Product.aggregate([
      { $match: query },
      { $project: { specifications: { $objectToArray: '$specifications' } } },
      { $unwind: '$specifications' },
      { $group: { _id: '$specifications.k', values: { $addToSet: '$specifications.v' } } }
    ]);
    
    // Format specifications
    const attributes = {};
    specificationsKeys.forEach(spec => {
      attributes[spec._id] = spec.values;
    });
    
    res.json({
      brands: brands.sort(),
      priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
      attributes
    });
  } catch (error) {
    console.error('Get filter options error:', error);
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

// @desc    Get product count by category
// @route   GET /api/products/category-counts
// @access  Public
export const getProductCountByCategory = async (req, res) => {
  try {
    const categoryCounts = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convertește rezultatul într-un obiect pentru accesare mai usoara
    const countsMap = {};
    categoryCounts.forEach(item => {
      if (item._id) {
        countsMap[item._id] = item.count;
      }
    });
    
    res.json(countsMap);
  } catch (error) {
    console.error('Get category counts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recommended products (one from each popular category)
// @route   GET /api/products/recommended
// @access  Public
export const getRecommendedProducts = async (req, res) => {
  try {
    // Definește categoriile principale pentru recomandări
    const mainCategories = [
      'Gaming PC', 
      'Procesoare', 
      'PC Office', 
      'Periferice'
    ];
    
    // Creăm un array pentru a stoca promisiunile
    const categoryPromises = mainCategories.map(async (category) => {
      // Pentru fiecare categorie, găsim un produs
      // Preferăm produsele cu discount sau marcate ca noi
      const products = await Product.find({ category })
        .sort({ discount: -1, isNew: -1, rating: -1 })
        .limit(1);
        
      // Returnăm primul produs găsit sau null
      return products.length > 0 ? products[0] : null;
    });
    
    // Așteptăm toate promisiunile
    const recommendedProducts = await Promise.all(categoryPromises);
    
    // Filtrăm produsele null (în cazul în care o categorie nu are produse)
    const filteredProducts = recommendedProducts.filter(product => product !== null);
    
    res.json(filteredProducts);
  } catch (error) {
    console.error('Get recommended products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCountByCategory,
  getRecommendedProducts
};