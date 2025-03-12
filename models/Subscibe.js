const mongoose = require("mongoose");

const Subscribe = mongoose.model(
  "Subscribe",
  new mongoose.Schema({
    userId:String,
    date:String,
    validity:String,
    stalls :Number,
    status : String,
    price : Number,
    first:Number,
    second:Number,
    third:Number
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Subscribe;