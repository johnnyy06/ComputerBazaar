// backend/models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // aici se realizeaza legatura cu utilizatorul
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // legatura cu produsul
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      }
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'cash_on_delivery'],
      required: true,
    },
    paymentResult: {
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true } // creeaza automat `createdAt` și `updatedAt`
);

const Order = mongoose.model('Order', orderSchema);

export default Order;