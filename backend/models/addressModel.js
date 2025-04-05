// backend/models/addressModel.js
import mongoose from 'mongoose';

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    street: {
      type: String,
      required: [true, 'Strada este obligatorie']
    },
    city: {
      type: String,
      required: [true, 'Orașul este obligatoriu']
    },
    postalCode: {
      type: String,
      required: [true, 'Codul poștal este obligatoriu']
    },
    country: {
      type: String,
      required: [true, 'Țara este obligatorie'],
      default: 'România'
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to ensure only one default address per user
addressSchema.pre('save', async function(next) {
  // If this address is set as default
  if (this.isDefault) {
    try {
      // Find all other addresses of this user that are set as default
      await this.constructor.updateMany(
        { 
          user: this.user, 
          _id: { $ne: this._id },
          isDefault: true 
        },
        { 
          isDefault: false 
        }
      );
    } catch (error) {
      next(error);
    }
  }
  next();
});

const Address = mongoose.model('Address', addressSchema);

export default Address;