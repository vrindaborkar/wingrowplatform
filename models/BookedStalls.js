const mongoose = require("mongoose");

const BookedStalls = mongoose.model(
  "BookedStalls",
  new mongoose.Schema({
      location:String,
      address:String,
      stallName: String,
      link:String,
      stallPrice: Number,
      isBooked: Boolean,
      bookedBy: String,
      bookedAt: String,
      stallNo:Number
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = BookedStalls;