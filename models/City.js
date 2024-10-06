const mongoose = require('mongoose');

// Define the City Schema
const CitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  stateId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'State', 
    required: true 
  }
});

// Create the City model from the schema
const City = mongoose.model('City', CitySchema);

module.exports = City;
