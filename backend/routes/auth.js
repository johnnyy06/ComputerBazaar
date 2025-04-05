// backend/routes/auth.js
import express from 'express';
import { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile, 
  logoutUser 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/logout', protect, logoutUser);

export default router;