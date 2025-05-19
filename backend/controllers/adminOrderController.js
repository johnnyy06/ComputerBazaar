// backend/controllers/adminOrderController.js
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 20;
    const keyword = req.query.keyword;
    
    let query = {};
    
    if (keyword) {
      // if keyword is a valid ObjectId , search by _id
      const isObjectId = keyword.match(/^[0-9a-fA-F]{24}$/);
      
      if (isObjectId) {
        query = { _id: keyword };
      } else {
        // first match an user by name or email
        const matchingUsers = await User.find({
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } }
          ]
        });
        
        // if no user found, search by address
        const userIds = matchingUsers.map(user => user._id);
        
        // looking for orders by user or by address
        query = {
          $or: [
            { user: { $in: userIds } },
            { 'shippingAddress.address': { $regex: keyword, $options: 'i' } },
            { 'shippingAddress.city': { $regex: keyword, $options: 'i' } },
            { 'shippingAddress.country': { $regex: keyword, $options: 'i' } },
          ]
        };
      }
    }

    const count = await Order.countDocuments(query);
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order by ID (admin)
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name images');

    if (!order) {
      return res.status(404).json({ message: 'Comandă negăsită' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { isPaid, isDelivered } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Comandă negăsită' });
    }

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid) {
        order.paidAt = Date.now();
      }
    }

    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      if (isDelivered) {
        order.deliveredAt = Date.now();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete order (admin)
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Comandă negăsită' });
    }

    await order.deleteOne();
    res.json({ message: 'Comanda a fost ștearsă' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order statistics (admin)
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const deliveredOrders = await Order.countDocuments({ isDelivered: true });
    const pendingOrders = await Order.countDocuments({ 
      isPaid: false, 
      isDelivered: false 
    });

    // Get total revenue
    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    // Get monthly stats
    const monthlyStats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { 
            $sum: { 
              $cond: ['$isPaid', '$totalPrice', 0] 
            } 
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      totalOrders,
      paidOrders,
      deliveredOrders,
      pendingOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyStats
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};