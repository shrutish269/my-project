const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = 'mysecretkey'; // In real apps, keep this in .env

// Dummy user data
const user = {
  username: 'user1',
  password: 'password123',
  balance: 1000
};

// ------------------------- LOGIN ROUTE -------------------------
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    // Create JWT token valid for 1 hour
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// ------------------------- MIDDLEWARE -------------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header missing or incorrect' });
  }

  const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
}

// ------------------------- BALANCE ROUTE -------------------------
app.get('/balance', verifyToken, (req, res) => {
  res.json({ balance: user.balance });
});

// ------------------------- DEPOSIT ROUTE -------------------------
app.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  user.balance += amount;
  res.json({ message: `Deposited $${amount}`, newBalance: user.balance });
});

// ------------------------- WITHDRAW ROUTE -------------------------
app.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid withdrawal amount' });
  }

  if (amount > user.balance) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  user.balance -= amount;
  res.json({ message: `Withdrew $${amount}`, newBalance: user.balance });
});

// ------------------------- START SERVER -------------------------
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
