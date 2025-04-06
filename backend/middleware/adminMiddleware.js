// backend/middleware/adminMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to verify the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    // Check if token exists in Authorization header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_jwt_secret'
      );

      // Find the user by decoded ID
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Utilizator negăsit' });
      }

      // Check if user is an admin
      if (user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Acces interzis. Este necesară permisiune de administrator.'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'Nu sunteți autorizat, nu există token' });
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalid' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Sesiune expirată. Vă rugăm să vă autentificați din nou.' });
    }
    res.status(401).json({ message: 'Nu sunteți autorizat, token invalid' });
  }
};

export default { isAdmin };