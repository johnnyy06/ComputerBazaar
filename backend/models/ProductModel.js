// backend/models/ProductModel.js
import { Schema, model } from 'mongoose';

// Schema for product reviews
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String, 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Schema for product images
const imageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  originalName: {
    type: String
  }
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [imageSchema],
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  specifications: {
    type: Map,
    of: Schema.Types.Mixed, // poate contine valori diverse (string, numar, array, obiecte etc.)
  },
  isNew: {
    type: Boolean,
    default: false
  },
  oldPrice: {
    type: Number
  },
  discount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.oldPrice && this.price) {
    this.discount = Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  } else {
    this.discount = 0;
  }
  next();
});

const Product = model('Product', productSchema);

export default Product;