// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_jwt_secret'
      );

      // Find the user
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Utilizator negăsit' });
      }

      // Check if the token exists in user's sessions
      const validSession = user.sessions.find(session => session.token === token);
      
      if (!validSession) {
        return res.status(401).json({ message: 'Sesiune invalidă. Vă rugăm să vă autentificați din nou.' });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Nu sunteți autorizat, token invalid' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Nu sunteți autorizat, nu există token' });
  }
};

// Check if user has admin role
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Nu sunteți autorizat ca administrator' });
  }
};

// Check if user has specific role
export const hasRole = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ 
        message: 'Nu aveți permisiunile necesare pentru această acțiune' 
      });
    }
  };
};

export default { protect, isAdmin, hasRole };