// backend/routes/upload.js
import express from 'express';
import { uploadImage, uploadImages, deleteUploadedImage } from '../controllers/uploadController.js';
import { uploadSingle, uploadMultiple } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Upload a single image
router.post('/image', uploadSingle, uploadImage);

// Upload multiple images (max 5)
router.post('/images', uploadMultiple, uploadImages);

// Delete image (admin only)
router.delete('/image/:publicId', isAdmin, deleteUploadedImage);

export default router;