const jwt = require('jsonwebtoken');
const config = require('../config');

function signToken(user) {
  return jwt.sign({ sub: user._id ? user._id.toString() : user.id, role: user.role }, config.JWT_SECRET, { expiresIn: '7d' });
}

async function getUserFromToken(header) {
  if (!header) return null;
  const token = (header || '').replace('Bearer ', '').trim();
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    return { id: payload.sub, role: payload.role };
  } catch (e) {
    return null;
  }
}

module.exports = { signToken, getUserFromToken };
