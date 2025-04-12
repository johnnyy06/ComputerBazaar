// backend/controllers/uploadController.js
import { cloudinary } from '../config/cloudinary.js';

// @desc    Upload a single image
// @route   POST /api/upload/image
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    // The file is already uploaded to Cloudinary by the middleware
    if (!req.file) {
      return res.status(400).json({ message: 'Nicio imagine furnizată' });
    }

    // Return the image details
    res.status(200).json({
      url: req.file.path,
      publicId: req.file.filename,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Eroare la încărcarea imaginii' });
  }
};

// @desc    Upload multiple images (up to 5)
// @route   POST /api/upload/images
// @access  Private
export const uploadImages = async (req, res) => {
  try {
    // The files are already uploaded to Cloudinary by the middleware
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Nicio imagine furnizată' });
    }

    // Return the images details
    const uploadedImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname
    }));

    res.status(200).json(uploadedImages);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Eroare la încărcarea imaginilor' });
  }
};

// @desc    Delete an image from Cloudinary
// @route   DELETE /api/upload/image/:publicId
// @access  Private/Admin
export const deleteUploadedImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({ message: 'ID-ul imaginii este necesar' });
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.status(200).json({ message: 'Imaginea a fost ștearsă cu succes' });
    } else {
      res.status(400).json({ message: 'Eroare la ștergerea imaginii' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Eroare la ștergerea imaginii' });
  }
};