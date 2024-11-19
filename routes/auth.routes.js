const verifySignUp  = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup",controller.signup );
  app.post("/auth/signin", controller.signin);
  app.post("/auth/feedback", controller.feedback);

  //admin
  app.post("/auth/adminSignUp",controller.adminSignUp );
  app.post("/auth/adminSignin",controller.adminSignin );


  // app.put("/auth/image" , controller.postPic)
   //app.post("/auth/address", controller.addAddress);
  // app.post("/signup",[verifySignUp.checkDuplicatePhone],controller.signup );
  // app.post("/signin", controller.signin);
  app.put("/image" , controller.postPic)
 app.post("/address", controller.addAddress);
  // app.post("/auth/newpassword", controller.newpassword);
  app.post("/check",controller.checkPhone)
};
