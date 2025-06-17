const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  try {
    // Get token from cookies
    const authCookie = req.cookies.Authorization;
    
    if (!authCookie) {
      return res.status(403).json({
        status: "error",
        message: "No token provided!"
      });
    }

    // Remove 'Bearer ' prefix if it exists
    const token = authCookie.startsWith('Bearer ') ? authCookie.slice(7) : authCookie;

    // Verify token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      status: "error",
      message: "Unauthorized!"
    });
  }
};

const authJwt = {
  verifyToken
};

module.exports = authJwt; 