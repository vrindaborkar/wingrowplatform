// const authJwt = require('../middlewares/auth.jwt')
// const controller = require("../controllers/user.controller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/inward" , [authJwt.verifyToken ] , controller.postInward);
//   app.post("/outward" , [authJwt.verifyToken ] , controller.postOutward);
//   app.post("/inward", controller.postInward);

//   // router.post('/inward', inwardController.postInward);
// // router.get('/inward', inwardController.getInward);
//   // app.post("/outward", controller.postOutward);

//   // app.get("/inward" , [authJwt.verifyToken ] , controller.getInward);
//   app.get("/outward" , [authJwt.verifyToken ] , controller.getOutward);
//   app.get("/inwardData" , [authJwt.verifyToken ] , controller.getInwardData);
//   app.get("/outwardData" , [authJwt.verifyToken ] , controller.getOutwardData);
//   app.get("/inward-outward",[authJwt.verifyToken ], controller.getInwardOutwardData);
//   app.get("/farmer" , controller.getUser);
//   app.get("/allusers" , controller.getAllUsers);
//   app.get("/users" , controller.getUsers);
//   //app.get("/sub",[authJwt.verifyToken ] , controller.getSub)
//   app.post("/sub", controller.postSub)
//   app.post("/sub1",controller.getSub)
//   app.post("/deleteSub",controller.deletecancelledStalls)
//   app.put("/changestatus",controller.changestatus)
//   app.put("/changeStalls",controller.changeStalls)
//   //app.get("/subData",controller.subData)
//   app.get("/sub",controller.getSubscribedData)
//   app.get("/getMarket",controller.getMarket)
//   app.get("/getMarkets", controller.getMarkets)
//   app.post("/addMarket",controller.addMarket)

// };


const authJwt = require('../middlewares/auth.jwt');
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  // Set CORS headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Routes for Inward and Outward
  app.post("/inward", controller.postInward); // Remove `authJwt.verifyToken` for testing
  app.post("/outward", controller.postOutward); // Remove `authJwt.verifyToken` for testing
  app.get("/inward",controller.getInward); // Remove `authJwt.verifyToken` for testing
  app.get("/outward", controller.getOutward);
  app.get("/outward/all", controller.getAllOutward);
  app.get("/inwardData", controller.getInwardData);
  app.get("/outwardData", controller.getOutwardData);
  app.get("/inward-outward", controller.getInwardOutwardData);

  app.get('/api/inward/filtered', controller.getInwardFiltered);
  app.get('/api/outward/filtered', controller.getOutwardFiltered);

  


  // Farmer and User-related routes
  app.get("/farmer", controller.getUser);
  app.get("/allusers", controller.getAllUsers);
  app.get("/users", controller.getUsers);

  // Subscription-related routes
  app.post("/sub", controller.postSub);
  app.post("/sub1", controller.getSub);
  app.post("/deleteSub", controller.deletecancelledStalls);
  app.put("/changestatus", controller.changestatus);
  app.put("/changeStalls", controller.changeStalls);
  app.get("/sub", controller.getSubscribedData);

  // Market-related routes
  app.get("/getMarket", controller.getMarket);
  app.get("/getMarkets", controller.getMarkets);
  app.post("/addMarket", controller.addMarket);
};

