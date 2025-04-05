// backend/models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Numele este obligatoriu'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email-ul este obligatoriu'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Adresa de email nu este validă'
      ]
    },
    password: {
      type: String,
      required: [true, 'Parola este obligatorie'],
      minlength: [6, 'Parola trebuie să aibă cel puțin 6 caractere']
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'guest'], 
      default: 'user', // Changed default from guest to user
    },
    sessions: [
      {
        token: String, // JWT Token
        device: String, // ex: "Chrome on Windows"
        ip: String, // Adresa IP
        createdAt: { type: Date, default: Date.now },
        lastActive: { type: Date, default: Date.now }
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
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', // referință către adresele utilizatorului
      }
    ],
    phone: String,
    avatar: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationExpires: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
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
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Dacă parola se schimbă, șterge toate sesiunile active
    if (this.isModified('password')) {
      this.sessions = [];
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Generare token pentru verificare email
userSchema.methods.generateVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
    
  // Token expiră în 24 ore
  this.verificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  
  return verificationToken;
};

const User = mongoose.model('User', userSchema);

export default User;