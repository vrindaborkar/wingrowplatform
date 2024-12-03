const mongoose = require("mongoose");

const Outward = mongoose.model(
  "Outward",
  new mongoose.Schema({
    marketName:String,
    commodity:String,
    // sales_quantity:Number,
    sales_rate:Number,
    total_sales:Number,
    userId:String,
    // time:String,
    date: {
      type: Date,
      // default: Date.now, // Store as a Date object
      required: true,
    },
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Outward; 