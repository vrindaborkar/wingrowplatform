const authJwt = require('../middlewares/auth.jwt')
const verifyToken = require('../middlewares/verifyToken');
const controller = require("../controllers/stalls.controller");
// const Stalls = require("../models/Stalls");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  
  //changes************************//
  app.get("/stallsTemp", controller.getStallsTemp)
  app.put('/stallsTemp', controller.putStalls)
  app.post('/stallsTemp', controller.postStalls)
  app.get("/bookedstallsTemp", controller.getbookedStallsTemp)
  app.delete("/bookedstallsTemp", controller.deletebookedStalls)
  //end***************************//

  app.get("/stalls",[verifyToken], controller.getStalls)
  app.get("/bookedstalls", controller.getBookedStalls)
  app.get("/api/stallstatus/bookedstalls/upcoming", [verifyToken], controller.getUpcomingBookings)
  app.get("/api/stallstatus/mybookings", [verifyToken], controller.getUserBookings)
  app.delete("/bookedstalls",[verifyToken], controller.deletebookedStalls)
  app.post("/bookedstalls",[verifyToken], controller.createBooking)
  app.put('/stalls' , [verifyToken , authJwt.isFarmer] , controller.putStalls)  
  app.post('/stalls' , controller.postStalls)  
  app.put('/reset' ,  controller.resetStalls)
  // app.get("/inwardoutward",[authJwt.verifyToken], controller.getInOutData)
  app.post("/cancelledstalls",[verifyToken], controller.postcancelledstalls)
  app.get("/cancelledstalls",[verifyToken], controller.getcancelledstalls)
  app.delete("/cancelledstalls",[verifyToken], controller.deletecancelledStalls)
  
};
