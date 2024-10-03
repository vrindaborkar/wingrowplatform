const mongoose = require("mongoose");

const BookedStalls = mongoose.model(
  "BookedStalls",
  new mongoose.Schema({
      stallId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Stalls',  // Reference to the Stalls schema
          required: true
      },
      isBooked: {
          type: Boolean,
          default: false
      },
      bookedBy: {
          type: String,   // This can be an ObjectId if referencing a user schema
          required: true
      },
      bookedAt: {
          type: Date,
          default: Date.now
      }
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = BookedStalls;