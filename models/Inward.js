const mongoose = require("mongoose");

const Inward = mongoose.model(
  "Inward",
  new mongoose.Schema({
    market:String,
    commodity:String,
    purchase_quantity:Number,
    purchase_rate:Number,
    total_purchase:Number,
    userId:String,
    time:String,
    date:Date,
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Inward;