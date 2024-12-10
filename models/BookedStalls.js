const mongoose = require("mongoose");

const BookedStalls = mongoose.model(
  "BookedStalls",
  new mongoose.Schema({
      name: String,
      address: String,
      stallName: String,
      link: String,
      stallPrice: Number,
      isBooked: Boolean,
      bookedBy: String,
      bookedAt: String,
      stallNo: Number,
      date: String // new field to store booking date
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = BookedStalls;
