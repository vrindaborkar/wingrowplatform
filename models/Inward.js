const mongoose = require("mongoose");

const Inward = mongoose.model(
  "Inward",
  new mongoose.Schema({
    name:String,
    commodity: String,
    purchase_quantity: Number,
    purchase_rate: Number,
    total_purchase: Number,
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    // time:String,
    date: {
      type: Date,
      // default: Date, // Store as a Date object
      required: true,
    },
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);
module.exports = Inward;