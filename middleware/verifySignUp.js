const User = require("../models/User");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const userByUsername = await User.findOne({
      username: req.body.username
    });

    if (userByUsername) {
      return res.status(400).json({
        status: "error",
        message: "Failed! Username is already in use!"
      });
    }

    // Check for duplicate email
    const userByEmail = await User.findOne({
      email: req.body.email
    });

    if (userByEmail) {
      return res.status(400).json({
        status: "error",
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp; 