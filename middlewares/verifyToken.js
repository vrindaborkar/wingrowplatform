const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

module.exports = (req, res, next) => {
  let token = null;

  // Check Authorization header first
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.Authorization) {
    // Fallback to Authorization cookie
    token = req.cookies.Authorization.replace('Bearer ', '');
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
