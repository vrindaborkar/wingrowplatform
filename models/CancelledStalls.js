const mongoose = require("mongoose");

const CancelledStalls = mongoose.model(
  "CancelledStalls",
  new mongoose.Schema({
      bookedBy:String,
      firstname :String,
      lastname :String,
      phone :String,
      location:String,
      address:String,
      stallName: String,
      stallPrice: Number,
      bookedBy: String,
      bookedAt: String,
      cancelledAt:String,
      stallNo:Number,
      isBooked:Boolean
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = CancelledStalls;