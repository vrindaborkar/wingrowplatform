const mongoose = require("mongoose");

const LiveMarket = mongoose.model(
  "LiveMarket",
  new mongoose.Schema({
      marketName:String,
      direction:String,
      offers : { type : Array , "default" : [] },
      bookedAt: String,
      
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = LiveMarket;