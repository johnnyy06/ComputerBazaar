import { Schema, model } from 'mongoose';

// Schema for product reviews
const reviewSchema = new Schema({
  user: {
    type: String, 
    required: true
  },
  rating: {
    type: Number, 
    required: true
  },
  comment: {
    type: String, 
    required: false
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
  }
}, { timestamps: true });

const Product = model('Product', productSchema);

export default Product;