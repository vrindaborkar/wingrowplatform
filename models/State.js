const mongoose = require('mongoose');

// Define the State Schema
const StateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  code: { 
    type: String, 
    required: true 
  } // Example: 'MH' for Maharashtra
});

// Create the model from the schema
const State = mongoose.model('State', StateSchema);

module.exports = State;
