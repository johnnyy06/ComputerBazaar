// backend/controllers/adminController.js
import User from '../models/userModel.js';
import Product from '../models/ProductModel.js';
import Order from '../models/orderModel.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password -sessions');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if the user is trying to delete themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        message: 'Nu puteți șterge propriul cont de administrator'
      });
    }

    // Find user by id
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    // Check if trying to delete another admin
    if (user.role === 'admin' && req.user.role === 'admin') {
      return res.status(400).json({
        message: 'Nu puteți șterge un alt cont de administrator'
      });
    }

    // Delete user
    await user.remove();
    
    res.json({ message: 'Utilizatorul a fost șters cu succes' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboardStats = async (req, res) => {
  try {
    // Count total users
    const userCount = await User.countDocuments({ role: 'user' });
    
    // Count total products
    const productCount = await Product.countDocuments();
    
    // Count total orders
    const orderCount = await Order.countDocuments();
    
    // Calculate total revenue from all orders
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    
    // Count products with low stock (less than 5)
    const lowStockCount = await Product.countDocuments({ stock: { $lt: 5 } });
    
    // Get recent orders (last 5)
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .select('user totalPrice isPaid isDelivered createdAt');
    
    // Get top selling products
    const topProducts = await Product.find({})
      .sort({ numReviews: -1 }) // Using numReviews as a proxy for popularity
      .limit(5)
      .select('name price rating numReviews stock');
    
    res.json({
      userCount,
      productCount,
      orderCount,
      totalRevenue,
      lowStockCount,
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error('Get admin dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getAllUsers,
  deleteUser,
  getAdminDashboardStats
};