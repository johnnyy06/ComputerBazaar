// backend/routes/address.js
import express from 'express';
import { 
  getUserAddresses, 
  getAddressById, 
  createAddress, 
  updateAddress, 
  deleteAddress,
  setAddressAsDefault
} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected - require authentication
router.use(protect);

// GET /api/users/addresses - Get all user addresses
router.get('/', getUserAddresses);

// GET /api/users/addresses/:id - Get address by ID
router.get('/:id', getAddressById);

// POST /api/users/addresses - Create new address
router.post('/', createAddress);

// PUT /api/users/addresses/:id - Update address
router.put('/:id', updateAddress);

// DELETE /api/users/addresses/:id - Delete address
router.delete('/:id', deleteAddress);

// PUT /api/users/addresses/:id/default - Set address as default
router.put('/:id/default', setAddressAsDefault);

export default router;