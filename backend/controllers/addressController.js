// backend/controllers/addressController.js
import Address from '../models/addressModel.js';
import User from '../models/userModel.js';

// @desc    Get all user addresses
// @route   GET /api/users/addresses
// @access  Private
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, updatedAt: -1 });
    
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single address
// @route   GET /api/users/addresses/:id
// @access  Private
export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!address) {
      return res.status(404).json({ message: 'Adresa nu a fost găsită' });
    }
    
    res.json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new address
// @route   POST /api/users/addresses
// @access  Private
export const createAddress = async (req, res) => {
  try {
    const { street, city, postalCode, country, isDefault } = req.body;
    
    // Validate input
    if (!street || !city || !postalCode) {
      return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii' });
    }
    
    // If this is the first address, set it as default
    const addressCount = await Address.countDocuments({ user: req.user._id });
    const shouldBeDefault = addressCount === 0 ? true : isDefault;
    
    const address = new Address({
      user: req.user._id,
      street,
      city,
      postalCode,
      country: country || 'România',
      isDefault: shouldBeDefault
    });
    
    const createdAddress = await address.save();
    
    res.status(201).json(createdAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
export const updateAddress = async (req, res) => {
  try {
    const { street, city, postalCode, country, isDefault } = req.body;
    
    // Find address and check if it belongs to user
    let address = await Address.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!address) {
      return res.status(404).json({ message: 'Adresa nu a fost găsită' });
    }
    
    // Update address fields
    address.street = street || address.street;
    address.city = city || address.city;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;
    
    const updatedAddress = await address.save();
    
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!address) {
      return res.status(404).json({ message: 'Adresa nu a fost găsită' });
    }
    
    // If deleting a default address, we need to set another one as default
    const wasDefault = address.isDefault;
    
    await address.remove();
    
    // If the deleted address was the default one, set another address as default if available
    if (wasDefault) {
      const firstAddress = await Address.findOne({ user: req.user._id });
      if (firstAddress) {
        firstAddress.isDefault = true;
        await firstAddress.save();
      }
    }
    
    res.json({ message: 'Adresa a fost ștearsă' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Set address as default
// @route   PUT /api/users/addresses/:id/default
// @access  Private
export const setAddressAsDefault = async (req, res) => {
  try {
    // Find the address
    const address = await Address.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!address) {
      return res.status(404).json({ message: 'Adresa nu a fost găsită' });
    }
    
    // If already default, return success
    if (address.isDefault) {
      return res.json(address);
    }
    
    // Set all user addresses as non-default
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );
    
    // Set this address as default
    address.isDefault = true;
    const updatedAddress = await address.save();
    
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({ message: 'Server error' });
  }
}