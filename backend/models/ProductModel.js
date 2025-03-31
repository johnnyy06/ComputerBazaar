import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  images:[{
    type: String,
    required: true,
  }],
  brand:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  stock:{
    type: Number,
    required: true,
    default: 0,
  },
  rating:{
    type: Number,
    required: true,
  },
  numReviews:{
    type: Number,
    required: true,
  },
  reviews:[{
    user: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: false}, // comentariul nu este obligatoriu la un review
    required: false,
  }],

  specifications: {
    type: Map,
    of: Schema.Types.Mixed, // poate contine valori diverse (string, numar, array, obiecte etc.)
    required: false,
  }
  
  }, { timestamps: true });

  const Product = model('Product', productSchema);

  export default Product;