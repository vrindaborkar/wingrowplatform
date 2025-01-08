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

// // Signup
// exports.signup = async (req, res, next) => {
//   try {
//     const { phone, firstname, lastname, role, farmertype, address } = req.body;
//     console.log(phone);
//     const userdata = await User.find({ "phone": phone, "role": role });

//     console.log(userdata[0]);
//     if (userdata[0]) {
//       res.status(400).json({
//         success: false,
//         message: "Please enter a different role that is not already in use",
//         // message2: "please enter a different role that is not already in use"
//       });
//     } else {
//       const user_creat = await User.create({
//         firstname: firstname,
//         lastname: lastname,
//         phone: phone,
//         // password: bcrypt.hashSync(password, 8),
//         role: role,
//         farmertype: farmertype,
//         address: address
//       });

//       if (user_creat) {
//         res.status(200).json({
//           success: true,
//           message: "user created successfully",
//           data: user_creat
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error in signup:", error);
//     res.status(500).json({ success: false, message: "Server error during signup" });
//   }
// };

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

/// ======================= OTP Handling =======================

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate OTP (6-digit code)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP with expiration
    await Otp.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    });

    // Send OTP via SMS
    const response = await sendOtp(phone, otp);

    res.status(200).json({ message: "OTP sent successfully", data: response });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Find OTP in database
    const otpRecord = await Otp.findOne({ phone, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

// ======================= Signup =======================

exports.signup = async (req, res) => {
  try {
    const { phone, firstname, lastname, role, farmertype, address } = req.body;

    // Check if user with same phone and role exists
    const existingUser = await User.findOne({ phone, role });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User already registered with the role: ${role}. Please use a different role.`,
      });
    }

    // Create new user
    const user = new User({
      firstname,
      lastname,
      phone,
      role,
      farmertype: role === "Farmer" ? farmertype : null, // Only set farmertype if role is Farmer
      address,
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Phone number and role combination already exists. Please try a different role.",
      });
    }

    res.status(500).json({ success: false, message: "Server error during signup" });
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
        firstname: firstname,
        lastname: lastname,
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

// User Sign In

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


// // Feedback
// exports.feedback = async (req, res) => {
//   try {
//     // Extract message, stars, and userId from the request body
//     const { message, stars, userId } = req.body;

//     // Create a new feedback instance
//     const feedback = new Feedback({
//       message,
//       stars,
//       user: userId // Store the reference to the user
//     });

//     // Save the feedback to the database
//     const data = await feedback.save();

//     // Send the saved feedback data as a response
//     res.status(200).send(data);
//   } catch (error) {
//     console.error('Error saving feedback:', error);
//     res.status(500).send({ message: 'Server error while saving feedback' });
//   }
// };


// POST: Add new feedback
// exports.addFeedback = async (req, res) => {
//   try {
//     const { message, stars, userId } = req.body;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create new feedback
//     const feedback = new Feedback({
//       user: userId,
//       message,
//       stars
//     });

//     const savedFeedback = await feedback.save();
//     res.status(201).json({ message: 'Feedback added successfully', data: savedFeedback });
//   } catch (error) {
//     console.error('Error adding feedback:', error);
//     res.status(500).json({ message: 'Server error while adding feedback' });
//   }
// };

// // GET: Retrieve all feedback
// exports.getAllFeedback = async (req, res) => {
//   try {
//     const feedbackList = await Feedback.find().populate('user', 'firstname lastname phone'); // Populate user details if needed
//     res.status(200).json({ feedback: feedbackList });
//   } catch (error) {
//     console.error('Error retrieving feedback:', error);
//     res.status(500).json({ message: 'Server error while retrieving feedback' });
//   }
// };


// // Subscription
// exports.subscription = async (req, res) => {
//   try {
//     const { userId, planId } = req.body;
//     // Assume we have a Subscription model and logic to handle subscription
//     const subscription = new Subscription({ userId, planId });
//     const result = await subscription.save();
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     console.error("Error in subscription:", error);
//     res.status(500).json({ success: false, message: "Server error during subscription" });
//   }
// };
