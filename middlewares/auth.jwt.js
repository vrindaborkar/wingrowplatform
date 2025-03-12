const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/User");
const jwt_decode =  require("jwt-decode");


exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    User.findById(id).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if(user.role === "admin"){
            next();
            return;
        }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
    })    
}

exports.isFarmer = (req, res, next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    User.findById(id).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if(user.role === "farmer"){
            next();
            return;
        }
    res.status(403).send({ message: "Require Farmers Role!" });
    return;
    })    
}
