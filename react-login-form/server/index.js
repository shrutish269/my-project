const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mysecretkey';

app.use(cors());
app.use(bodyParser.json());

const user = {
  id: 1,
  username: 'testuser',
  password: 'password123'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const verifyToken = require('./middleware/verifyToken');

app.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You have accessed a protected route!',
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});