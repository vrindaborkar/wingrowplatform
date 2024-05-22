const authJwt = require('../middlewares/auth.jwt')
const controller = require("../controllers/stalls.controller");
const Stalls = require("../models/Stalls");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // async function updateStallNames() {
  //   const newStallNames = ["Compay Stall","Leafy","Tarkari","Paneer","Tarkari","Dryfruits","Tarkari","Onion-Potato","Exotic","Mukhvas","Tarkari","Fruits","Fruits","Tarkari","Muktar Bhai","Tarkari","Tarkari","Antic","Tarkari","Laefy","Tarkari" ];
  //   const newStallPrices = [0,"500","300","300","300","300","300","500","500","100","300","500","500","300","800","800","300","500","300","500","300"];

  //   const stallsToUpdate = await Stalls.find({ location: "Hadapsar" });

  //   if (stallsToUpdate.length < newStallNames.length) {
  //     console.error("Insufficient stalls found for updating");
  //     return;
  //   }

  //   for (let i = 0; i < newStallNames.length; i++) {
  //     const stallToUpdate = stallsToUpdate[i];
  //     stallToUpdate.stallName = newStallNames[i];
  //     stallToUpdate.stallPrice = newStallPrices[i];
  //     await stallToUpdate.save();
  //   }

  //   console.log("Stall names and prices updated successfully");
  // }

  // updateStallNames();








  
  //changes************************//
  app.get("/stallsTemp", controller.getStallsTemp)
  app.put('/stallsTemp', controller.putStalls)
  app.post('/stallsTemp', controller.postStalls)
  app.get("/bookedstallsTemp", controller.getbookedStallsTemp)
  app.delete("/bookedstallsTemp", controller.deletebookedStalls)
  app.post("/bookedstallsTemp", controller.postbookedStalls)
  //end***************************//

  app.get("/stalls",[authJwt.verifyToken], controller.getStalls)
  app.get("/bookedstalls", controller.getbookedStalls)
  app.delete("/bookedstalls",[authJwt.verifyToken], controller.deletebookedStalls)
  app.post("/bookedstalls",[authJwt.verifyToken], controller.postbookedStalls)
  app.put('/stalls' , [authJwt.verifyToken , authJwt.isFarmer] , controller.putStalls)  
  app.post('/stalls' , controller.postStalls)  
  app.put('/reset' ,  controller.resetStalls)
  app.get("/inwardoutward",[authJwt.verifyToken], controller.getInOutData)
  app.post("/cancelledstalls",[authJwt.verifyToken], controller.postcancelledstalls)
  app.get("/cancelledstalls",[authJwt.verifyToken], controller.getcancelledstalls)
  app.delete("/cancelledstalls",[authJwt.verifyToken], controller.deletecancelledStalls)
  
};
