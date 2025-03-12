const mongoose = require("mongoose");

const Leave = mongoose.model(
  "Leave",
  new mongoose.Schema({
      user :String,
      reason:String,
      date:String,
      appoved:String,
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Leave;