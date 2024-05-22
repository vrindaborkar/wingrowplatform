const mongoose = require("mongoose");

const Outward = mongoose.model(
  "Outward",
  new mongoose.Schema({
    market:String,
    commodity:String,
    // sales_quantity:Number,
    sales_rate:Number,
    total_sales:Number,
    userId:String,
    time:String
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Outward; 