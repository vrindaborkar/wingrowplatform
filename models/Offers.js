const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    // ref: 'Market', // Assuming you have a Market collection
    required: true
  },
  commodityName: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  offerRate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the admin who created the offer
    required: true
  }
});

module.exports = mongoose.model('Offer', OfferSchema);
