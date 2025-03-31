const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// do to: se poate sa trebuiasca modificat, avand in vedere dorinta de a face ca 
// sesiunile de conectare sa se deosebeasca prin jwt token (intre admin, user si guest)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'guest'], 
      default: 'guest',
    },
    sessions: [
      {
        token: String, // JWT Token
        device: String, // ex: "Chrome on Windows"
        ip: String, // Adresa IP
        createdAt: { type: Date, default: Date.now },
      }
    ],
    lastLogin: { type: Date },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      }
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // referinta catre produsele favorite
      }
    ],
    address: {
      type: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      required: false, // adresa este optionala
    },
  },
  {
    timestamps: true,
  }
);

// Metoda pentru compararea parolei
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pentru hashing parola înainte de salvare
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // Șterge toate sesiunile active dacă parola se schimbă
  this.sessions = [];

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;