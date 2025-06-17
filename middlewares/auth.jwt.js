const jwt = require("jsonwebtoken");
const config = require("../config/app.config");
const User = require("../models/User");
const jwt_decode = require("jwt-decode");

exports.verifyToken = (req, res, next) => {
  console.log("Headers received:", req.headers); // Debug log

  // Check both Authorization header and x-access-token for backward compatibility
  const authHeader = req.headers["authorization"];
  const xAccessToken = req.headers["x-access-token"];
  
  // Try to get token from either source
  let token = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log("Token from Authorization header:", token); // Debug log
  } else if (xAccessToken) {
    token = xAccessToken;
    console.log("Token from x-access-token:", token); // Debug log
  }

  if (!token) {
    console.log("No token found in request"); // Debug log
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err); // Debug log
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log("Token verified successfully for user:", decoded.id); // Debug log
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  const { id } = jwt_decode(token);
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

exports.isFarmer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  const { id } = jwt_decode(token);
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "farmer") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Farmers Role!" });
    return;
  });
};
