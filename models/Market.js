const mongoose = require('mongoose');

// Define the Market schema
const marketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    marketDay: {
        type: String,
        required: true,  // Example: "Saturday"
    },
    totalStalls: {
        type: Number,
        required: true,  // Example: 15 stalls available
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Market = mongoose.model('Market', marketSchema);
module.exports = Market;
