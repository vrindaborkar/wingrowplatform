const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Market schema
const marketSchema = new Schema({
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
    stallsAvailable: {
        type: Number,
        required: true,
    },
    marketDay: {
        type: String,
        required: true,  // Example: "Saturday"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const Market = mongoose.model('Market', marketSchema);
module.exports = Market;
