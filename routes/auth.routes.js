const express = require('express');
const router = express.Router();
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

// CORS headers middleware
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// User Authentication Routes
router.post("/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
router.post("/api/auth/signin", controller.signin);
router.post("/auth/adminSignUp", controller.adminSignUp);
router.post("/auth/adminSignin", controller.adminSignin);

// File and Address Management
router.put("/image", controller.postPic);
router.post("/address", controller.addAddress);

// Phone Verification
router.post("/check", controller.checkPhone);

router.post("/auth/sendOtp", controller.sendOtp);
router.post("/auth/verify", controller.verifyOtp);

// Profile Routes
router.get('/profile', [authJwt.verifyToken], controller.getUserProfile);      
router.post('/profile', [authJwt.verifyToken], controller.updateUserProfile);  

// Logout Route
router.post('/auth/logout', [authJwt.verifyToken], controller.logout);

module.exports = router;
