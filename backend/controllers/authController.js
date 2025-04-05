// backend/controllers/authController.js
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '30d' }
  );
};

// @desc    User login
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
      // Create a session record for the user
      const token = generateToken(user._id);
      
      // Add the session to the user's sessions array
      const deviceInfo = req.headers['user-agent'] || 'Unknown device';
      const ipAddress = req.ip || 'Unknown IP';
      
      user.sessions.push({
        token,
        device: deviceInfo,
        ip: ipAddress,
        createdAt: Date.now(),
        lastActive: Date.now()
      });
      
      user.lastLogin = Date.now();
      await user.save();
      
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Email sau parolă invalidă' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utilizatorul există deja' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Parola trebuie să aibă minim 6 caractere' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // Will be hashed via userModel middleware
      role: 'user' // Default role for registered users
    });

    if (user) {
      // Create session for the new user
      const token = generateToken(user._id);
      
      // Add the session to the user's sessions array
      const deviceInfo = req.headers['user-agent'] || 'Unknown device';
      const ipAddress = req.ip || 'Unknown IP';
      
      user.sessions.push({
        token,
        device: deviceInfo,
        ip: ipAddress,
        createdAt: Date.now(),
        lastActive: Date.now()
      });
      
      user.lastLogin = Date.now();
      await user.save();
      
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(400).json({ message: 'Date utilizator invalide' });
    }
  } catch (error) {
    console.error('Register error:', error);
    
    // Check for MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email-ul este deja înregistrat' });
    }
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    // req.user comes from the auth middleware
    const user = await User.findById(req.user.id).select('-password -sessions');

    if (!user) {
      return res.status(404).json({ message: 'Utilizator negăsit' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      orders: user.orders,
      favorites: user.favorites,
      address: user.address,
      phone: user.phone
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilizator negăsit' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    
    if (req.body.address) {
      user.address = {
        street: req.body.address.street || user.address?.street,
        city: req.body.address.city || user.address?.city,
        postalCode: req.body.address.postalCode || user.address?.postalCode,
        country: req.body.address.country || user.address?.country
      };
    }
    
    // Update password if provided
    if (req.body.password && req.body.password.length >= 6) {
      user.password = req.body.password;
    }

    // Save updated user
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      phone: updatedUser.phone
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user (invalidate token)
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res) => {
  try {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Nu sunteți autentificat' });
    }
    
    // Find user by ID and remove the current session
    const user = await User.findById(req.user.id);
    
    if (user) {
      // Remove the session with this token
      user.sessions = user.sessions.filter(session => session.token !== token);
      await user.save();
    }
    
    res.json({ message: 'Deconectare reușită' });
  }
  catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser
};