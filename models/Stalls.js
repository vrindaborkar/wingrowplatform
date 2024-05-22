const mongoose = require("mongoose");

const Stalls = mongoose.model(
  "Stalls",
  new mongoose.Schema({
      location:String,
      address:String,
      link: String,
      stallName: String,
      stallPrice: Number,
      stallNo:Number
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Stalls;