const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  // Set Global Headers
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // User Authentication Routes
  app.post("/auth/signup", controller.signup);
  app.post("/auth/signin", controller.signin);
  // app.post("/auth/feedback", controller.feedback);

  // Admin Authentication Routes
  app.post("/auth/adminSignUp", controller.adminSignUp);
  app.post("/auth/adminSignin", controller.adminSignin);

  // File and Address Management
  app.put("/image", controller.postPic);
  app.post("/address", controller.addAddress);

  // Phone Verification
  app.post("/check", controller.checkPhone);

  app.post("/auth/sendOtp", controller.sendOtp);
  app.post("/auth/verify", controller.verifyOtp);
  // app.post("/auth/signup", controller.signup);
  // app.post("/auth/signin", controller.signin);

};
