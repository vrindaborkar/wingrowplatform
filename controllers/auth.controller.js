var bcrypt = require("bcryptjs");
const User = require('../models/User');
var jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const jwt_decode = require("jwt-decode");
const Feedback = require("../models/Feedback");
const cloudinary = require('cloudinary').v2;
const Otp = require("../models/otp"); // Ensure you have the correct model path

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

// User Sign In

// exports.signin = async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = await User.findOne({
//       phone: req.body.phone,
//       role: req.body.role
//     });

//     if (user) {
//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });
//       res.status(200).send({
//         status: 'success',
//         message: 'You are logged in',
//         id: user._id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         phone: user.phone,
//         role: user.role,
//         accessToken: token,
//         farmertype: user.farmertype,
//         pic: user.pic,
//         address: user.address
//       });
//     } else {
//       return res.status(404).send({
//         status: 'failed',
//         message: "User Not found."
//       });
//     }
//   } catch (error) {
//     console.error("Error in signin:", error);
//     res.status(500).json({ status: 'failed', message: "Server error during sign-in" });
//   }
// };

const normalizePhoneNumber = (phone) => {
  if (phone.startsWith("+91") && phone.length > 13) {
    return "+91" + phone.slice(-10); // Ensure only last 10 digits after +91
  }
  if (!phone.startsWith("+91")) {
    return "+91" + phone; // Add +91 if missing
  }
  return phone; // Otherwise, return as it is
};

exports.signin = async (req, res) => {
  try {
    console.log("📌 Sign-in Request Received:", req.body);

    const phone = normalizePhoneNumber(req.body.phone); // Normalize phone number
    const role = req.body.role;

    console.log("🔍 Searching for User with:", { phone, role });

    const user = await User.findOne({ phone, role });

    if (!user) {
      console.log("❌ User Not Found in DB for:", { phone, role });
      return res.status(404).json({ status: "failed", message: "User Not found." });
    }

    console.log("✅ User Found in DB:", user);

    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });

    return res.status(200).json({
      status: "success",
      message: "You are logged in",
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
  } catch (error) {
    console.error("❌ Error in signin:", error);
    res.status(500).json({ status: "failed", message: "Server error during sign-in" });
  }
};

// exports.sendOtp = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     if (!phone) {
//       return res.status(400).json({ message: "Phone number is required" });
//     }

//     console.log("📩 Received phone number:", phone);

//     let formattedPhone = phone.startsWith("+91") ? phone : `+91${phone.replace(/\D/g, "")}`;
//     console.log("✅ Formatted Phone Number:", formattedPhone);

//     // Generate OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     console.log("🔢 Generated OTP:", otp);

//     // Send OTP to MSG91
//     const msg91Response = await axios.post(
//       `${process.env.MSG91_BASE_URL}/otp`,
//       null,
//       {
//         params: {
//           template_id: process.env.MSG91_TEMPLATE_ID,
//           mobile: formattedPhone,
//           authkey: process.env.MSG91_AUTH_KEY,
//           otp: otp,
//         },
//       }
//     );

//     console.log("📤 MSG91 Response:", msg91Response.data);

//     if (msg91Response.data.type !== "success") {
//       throw new Error("❌ Failed to send OTP via MSG91");
//     }

//     res.status(200).json({
//       message: "✅ OTP sent successfully",
//       data: msg91Response.data,
//       sentOtp: otp,  // ✅ TEMPORARY: Log the OTP in response (REMOVE IN PROD)
//     });

//   } catch (error) {
//     console.error("❌ Error sending OTP:", error);
//     res.status(500).json({ message: "Failed to send OTP", error: error.message });
//   }
// };



exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // ✅ Validate Phone Number
    if (!phone) {
      console.error("❌ Phone number is missing in request");
      return res.status(400).json({ type: "error", message: "Phone number is required" });
    }

    console.log("📩 Received phone number:", phone);

    // ✅ Format Phone Number Correctly
    let formattedPhone = phone.replace(/\D/g, ""); // Remove non-numeric characters
    if (!formattedPhone.startsWith("91")) {
      formattedPhone = `91${formattedPhone}`;
    }
    formattedPhone = `+${formattedPhone}`;

    console.log("✅ Formatted Phone Number:", formattedPhone);

    // ✅ Generate 4-Digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("🔢 Generated OTP:", otp);

    // ✅ Send OTP to MSG91
    const msg91Response = await axios.post(
      `${process.env.MSG91_BASE_URL}/otp`,
      null,
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: formattedPhone,
          authkey: process.env.MSG91_AUTH_KEY,
          otp: otp,
        },
      }
    );

    console.log("📤 MSG91 Response:", msg91Response.data);

    // ✅ Check MSG91 Response
    if (!msg91Response?.data || msg91Response.data.type !== "success") {
      console.error("❌ Failed to send OTP via MSG91:", msg91Response.data);
      throw new Error("Failed to send OTP via MSG91");
    }

    res.status(200).json({
      type: "success",
      message: "✅ OTP sent successfully",
      data: msg91Response.data,
      sentOtp: otp, // ✅ TEMPORARY: Log the OTP in response (REMOVE IN PROD)
    });

  } catch (error) {
    console.error("🚨 Error sending OTP:", error?.response?.data || error);
    res.status(500).json({
      type: "error",
      message: "Failed to send OTP",
      error: error?.response?.data || error.message,
    });
  }
};





const axios = require("axios");

exports.verifyOtp = async (req, res) => {
  try {
    console.log("🔹 Incoming OTP Verification Request:", req.body);

    const { otp, phone } = req.body;

    // ✅ Ensure OTP and phone are provided
    if (!otp || !phone) {
      console.error("❌ Missing OTP or Phone Number in Request");
      return res.status(400).json({ type: "error", message: "OTP and phone number are required" });
    }

    // ✅ Format OTP and Phone Number
    const formattedOtp = String(otp).trim(); // Trim any spaces
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone.replace(/\D/g, "")}`;

    console.log("📥 Received OTP:", formattedOtp);
    console.log("📞 Received Phone:", formattedPhone);

    // ✅ Construct MSG91 API URL
    const MSG91_URL = `https://control.msg91.com/api/v5/otp/verify?otp=${formattedOtp}&mobile=${formattedPhone}`;

    // ✅ Set request headers
    const headers = {
      "Content-Type": "application/json",
      authkey: process.env.MSG91_AUTH_KEY,
    };

    console.log("📤 Sending request to MSG91:", MSG91_URL);

    // ✅ Send verification request to MSG91
    const response = await axios.get(MSG91_URL, { headers });

    console.log("✅ MSG91 Verification Response:", response.data);

    // ✅ Handle MSG91 API response
    if (response.data?.type === "success") {
      console.log("🎉 OTP Verified Successfully!");
      return res.status(200).json({ type: "success", message: "✅ OTP Verified Successfully!" });
    } else {
      console.warn("⚠️ OTP Verification Failed:", response.data);
      return res.status(400).json({ type: "error", message: "❌ Invalid OTP" });
    }
  } catch (error) {
    console.error("🚨 Error verifying OTP:", error?.response?.data || error);

    return res.status(error.response?.status || 500).json({
      type: "error",
      message: "Failed to verify OTP",
      error: error.response?.data || { message: "Unknown error occurred" },
    });
  }
};



// exports.verifyOtp = async (req, res) => {
//   try {
//     console.log("🔹 Incoming OTP Verification Request:", req.body);

//     const { otp, phone } = req.body;
//     if (!otp || !phone) {
//       return res.status(400).json({ message: "OTP and phone number are required" });
//     }

//     // Ensure consistent phone format
//     const formattedOtp = String(otp).trim();
//     const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone.replace(/\D/g, "")}`;

//     console.log("📥 Received OTP:", formattedOtp);
//     console.log("📞 Received Phone:", formattedPhone);

//     const MSG91_URL = `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${formattedPhone}`;

//     const headers = {
//       "Content-Type": "application/json",
//       authkey: process.env.MSG91_AUTH_KEY,
//     };

//     console.log("📤 Sending request to MSG91:", MSG91_URL);

//     const response = await axios.get(MSG91_URL, { headers });

//     console.log("✅ MSG91 Verification Response:", response.data);

//     if (response.data.type === "success") {
//       return res.status(200).json({ type: "success", message: "✅ OTP Verified Successfully!" });
//     } else {
//       return res.status(400).json({ type: "error", message: "❌ Invalid OTP" });
//     }
//   } catch (error) {
//     console.error("❌ Error verifying OTP:", error?.response?.data || error);
//     return res.status(error.response?.status || 500).json({
//       message: "Failed to verify OTP",
//       error: error.response?.data || {},
//     });
//   }
// };


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
