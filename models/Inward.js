const mongoose = require("mongoose");

const Inward = mongoose.model(
  "Inward",
  new mongoose.Schema({
    marketName:String,
    commodity:String,
    purchase_quantity:Number,
    purchase_rate:Number,
    total_purchase:Number,
    userId:String,
    // time:String,
    date: {
      type: Date,
      default: Date.now, // Store as a Date object
      required: true,
    },
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Inward;