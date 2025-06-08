const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

module.exports = (req, res, next) => {
  // Get token from Authorization cookie
  const token = req.cookies?.Authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found in cookies' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
