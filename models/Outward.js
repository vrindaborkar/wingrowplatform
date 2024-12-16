const mongoose = require("mongoose");

const Outward = mongoose.model(
  "Outward",
  new mongoose.Schema({
    name:String,
    commodity: String,
    total_sales: Number,
    sales_rate: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    // time:String,
    date: {
      type: Date,
      required: true,
    },
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Outward; 