const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  offers: [
    {
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
        type: String, // Use String for custom date formats like "yyyy/mm/dd"
        required: true
      }
    }
  ]
}, {
  timestamps: true // Automatically handle createdAt and updatedAt
});

module.exports = mongoose.model('Offer', OfferSchema);
