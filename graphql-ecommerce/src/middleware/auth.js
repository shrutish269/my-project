const { getUserFromToken } = require('../utils/auth');

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const user = await getUserFromToken(authHeader);
    req.user = user;
  } catch (err) {
    req.user = null;
  }
  next();
};
