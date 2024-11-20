var bcrypt = require("bcryptjs");
const User = require('../models/User');
var jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const jwt_decode = require("jwt-decode");
const Feedback = require("../models/Feedback");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dpxzakezm', 
  api_key: '587784988219159', 
  api_secret: 'T571dxi6AZtczKJP0KYFVmLSQuc',
  secure: true
});

// Signup
exports.signup = async (req, res, next) => {
  try {
    const { phone, firstname, lastname, role, farmertype, address } = req.body;
    console.log(phone);
    const userdata = await User.find({ "phone": phone, "role": role });

    console.log(userdata[0]);
    if (userdata[0]) {
      res.status(400).json({
        success: false,
        message: "Please enter a different role that is not already in use",
        // message2: "please enter a different role that is not already in use"
      });
    } else {
      const user_creat = await User.create({
        firstName: firstname,
        lastName: lastname,
        phone: phone,
        // password: bcrypt.hashSync(password, 8),
        role: role,
        farmertype: farmertype,
        address: address
      });

      if (user_creat) {
        res.status(200).json({
          success: true,
          message: "user created successfully",
          data: user_creat
        });
      }
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
};

// Check Phone
exports.checkPhone = async (req, res) => {
  await User.findOne({
    phone: req.body.phone
  }).exec((err, user) => {
    if (user && user.role === req.body.role) {
      console.log("user found", user);
      return res.status(404).send({ message: "Found" });
    } else {
      console.log("user not found ");
      return res.status(200).send({ message: "NFound" });
    }
  });
};

// Signin
exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      phone: req.body.phone,
      role: req.body.role
    });

    if (user) {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        status: 'success',
        message: 'You are logged in',
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        role: user.role,
        accessToken: token,
        farmertype: user.farmertype,
        pic: user.pic,
        address: user.address
      });
    } else {
      return res.status(404).send({
        status: 'failed',
        message: "User Not found."
      });
    }
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).json({ status: 'failed', message: "Server error during sign-in" });
  }
};

// Admin Sign Up
exports.adminSignUp = async (req, res) => {
  try {
    const { phone, firstname, lastname, role } = req.body;
    console.log(phone);
    const userdata = await User.find({ "phone": phone, "role": role });

    console.log(userdata[0]);
    if (userdata[0]) {
      res.status(400).json({
        success: false,
        message: "Phone Number is already in use!",
        message2: "please enter a different role that is not already in use"
      });
    } else {
      const user_creat = await User.create({
        firstName: firstname,
        lastName: lastname,
        phone: phone,
        // password: bcrypt.hashSync(password, 8),
        role: role
      });

      if (user_creat) {
        res.status(200).json({
          success: true,
          message: "user created successfully",
          data: user_creat
        });
      }
    }
  } catch (error) {
    console.error("Error in adminSignUp:", error);
    res.status(500).json({ success: false, message: "Server error during admin signup" });
  }
};

// Admin Sign In
exports.adminSignin = async (req, res) => {
  try {
    const user = await User.findOne({
      phone: req.body.phone,
      role: req.body.role
    });

    if (user) {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        status: 'success',
        message: 'You are logged in',
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        role: user.role,
        accessToken: token,
        farmertype: user.farmertype,
        pic: user.pic,
        address: user.address
      });
    } else {
      return res.status(404).send({
        status: 'failed',
        message: "User Not found."
      });
    }
  } catch (error) {
    console.error("Error in adminSignin:", error);
    res.status(500).json({ status: 'failed', message: "Server error during admin sign-in" });
  }
};

// Post Pic
exports.postPic = async (req, res) => {
  let token = req.headers["x-access-token"];
  const { id } = jwt_decode(token);
  const file = req.files.photo;
  const data = await cloudinary.uploader.upload(file.tempFilePath);
  console.log(data);
  if (data) {
    const response = await User.findByIdAndUpdate({ _id: id }, { pic: data.secure_url });

    if (!response) {
      console.log("helloooo");
      res.status(400).json("something went wrong");
    }

    res.status(200).send(response);
  } else {
    console.log("hello");
    res.status(400).json("something went wrong");
  }
};

// Add Address
exports.addAddress = async (req, res) => {
  const { address } = req.body;
  console.log('the address is ', address);
  try {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token);

    if (!address) {
      res.json({
        success: false,
        message: "Please provide valid address"
      });
    } else {
      const data = await User.findByIdAndUpdate({ _id: id }, { address: address });
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("something went wrong");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Feedback
exports.feedback = async (req, res) => {
  const { message, stars } = req.body;
  const feedback = new Feedback({
    message,
    stars
  });
  const data = await feedback.save();
  res.status(200).send(feedback);
};

// New Password
// exports.newpassword = async (req, res) => {
//   const { phone, password } = req.body;
//   const user = await User.findOne({
//     phone: phone
//   });

//   user.password = bcrypt.hashSync(password, 8);
//   await user.save();
//   res.status(200).send(user);
// };

// Subscription
exports.subscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    // Assume we have a Subscription model and logic to handle subscription
    const subscription = new Subscription({ userId, planId });
    const result = await subscription.save();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error in subscription:", error);
    res.status(500).json({ success: false, message: "Server error during subscription" });
  }
};
