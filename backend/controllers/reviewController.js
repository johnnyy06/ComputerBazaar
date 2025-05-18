// backend/controllers/reviewController.js
import Product from '../models/ProductModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Create a new review or update existing one
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    // Validate input
    if (!rating) {
      return res.status(400).json({ message: 'Rating este obligatoriu' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating-ul trebuie să fie între 1 și 5' });
    }

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit' });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      // Update existing review
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
      alreadyReviewed.updatedAt = new Date();
    } else {
      // Add new review
      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(newReview);
    }

    // Update product rating stats
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Save product with new/updated review
    await product.save();

    res.status(201).json({ message: 'Recenzie adăugată cu succes' });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get all reviews for a product
 * @route   GET /api/products/:id/reviews
 * @access  Public
 */
export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product
    const product = await Product.findById(productId)
      .select('reviews rating numReviews')
      .populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit' });
    }

    res.json({
      reviews: product.reviews,
      rating: product.rating,
      numReviews: product.numReviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Delete a review
 * @route   DELETE /api/products/:id/reviews/:reviewId
 * @access  Private
 */
export const deleteReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewId = req.params.reviewId;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produsul nu a fost găsit' });
    }

    // Find the review
    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Recenzia nu a fost găsită' });
    }

    // Check if the review belongs to the user or user is admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'Nu aveți permisiunea de a șterge această recenzie',
      });
    }

    // Remove the review
    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== reviewId
    );

    // Update product rating stats
    if (product.reviews.length === 0) {
      product.rating = 0;
      product.numReviews = 0;
    } else {
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    }

    // Save product with review removed
    await product.save();

    res.json({ message: 'Recenzie ștearsă cu succes' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  createProductReview,
  getProductReviews,
  deleteReview,
};