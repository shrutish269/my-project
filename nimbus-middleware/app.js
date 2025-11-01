// app.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const REQUIRED_TOKEN = 'mysecrettoken'; // small demo; prefer env variable in production

// -------- Logging middleware (global) --------
function logger(req, res, next) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.originalUrl}`);
  next();
}
app.use(logger); // apply to ALL routes

// -------- Bearer token authentication middleware --------
function authenticateBearer(req, res, next) {
  const authHeader = req.headers['authorization']; // header names are lowercase in node
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ message: "Authorization header missing or incorrect" });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (token !== REQUIRED_TOKEN) {
    return res.status(401).json({ message: "Authorization header missing or incorrect" });
  }

  // token valid -> continue
  next();
}

// -------- Routes --------
app.get('/public', (req, res) => {
  res.status(200).send('This is a public route. No authentication required.');
});

app.get('/protected', authenticateBearer, (req, res) => {
  res.status(200).send('You have accessed a protected route with a valid Bearer token!');
});

// health / root
app.get('/', (req, res) => {
  res.send('Hello — server is up. Try /public and /protected');
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});