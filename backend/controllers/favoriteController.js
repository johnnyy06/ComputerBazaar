// backend/controllers/favoriteController.js
import User from '../models/userModel.js';
import Product from '../models/ProductModel.js';

// @desc    Add product to user favorites
// @route   POST /api/favorites
// @access  Private
export const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;

    // Verify the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit' });
    }

    // Find the user and update
    const user = await User.findById(req.user._id);
    
    // Check if the product is already in favorites
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Produsul este deja în lista de favorite' });
    }
    
    // Add to favorites
    user.favorites.push(productId);
    await user.save();
    
    res.status(200).json({ 
      message: 'Produs adăugat la favorite',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove product from user favorites
// @route   DELETE /api/favorites/:productId
// @access  Private
export const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Find the user and update
    const user = await User.findById(req.user._id);
    
    // Check if the product is in favorites
    if (!user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Produsul nu este în lista de favorite' });
    }
    
    // Remove from favorites
    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();
    
    res.status(200).json({ 
      message: 'Produs eliminat din favorite',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    // Find user and populate favorites with product details
    const user = await User.findById(req.user._id)
      .populate('favorites');
    
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Check if product is in user favorites
// @route   GET /api/favorites/:productId
// @access  Private
export const checkFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Find the user
    const user = await User.findById(req.user._id);
    
    // Check if the product is in favorites
    const isFavorite = user.favorites.includes(productId);
    
    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  checkFavorite
};