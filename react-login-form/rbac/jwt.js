// rbac/jwt.js
const jwt = require("jsonwebtoken");
const SECRET = "yourSecretKey"; // You can move this to .env later

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };