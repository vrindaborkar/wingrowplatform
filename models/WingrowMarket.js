const mongoose = require('mongoose');

const wingrowMarketSchema = new mongoose.Schema({
  marketName: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('WingrowMarket', wingrowMarketSchema);
