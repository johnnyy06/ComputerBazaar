import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simulăm o bază de date pentru utilizatori
let users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2b$10$1JpL2Hu6HAVQPkSBTXhlTOkdjqZqrLxiEDrBqiMKPXVtmHjPpMvyW', // "password123"
    name: 'Admin User'
  }
];

// Rută pentru login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Găsește utilizatorul
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verifică parola
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generează JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rută pentru înregistrare
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifică dacă utilizatorul există deja
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hașurează parola
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creează noul utilizator
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    };

    // Adaugă utilizatorul la "baza de date"
    users.push(newUser);

    // Generează JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware pentru autentificare
const auth = (req, res, next) => {
  try {
    // Verifică header-ul Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verifică token-ul
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Rută protejată pentru a testa autentificarea
router.get('/user', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});

export default router;