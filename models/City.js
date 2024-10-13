const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cityCode: {
        type: String,
        required: true,
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming stateId references a State model
        required: true, // Make sure this is set to true to enforce the requirement
        ref: 'State', // Reference the State model if needed
    },
});

module.exports = mongoose.model('City', citySchema);
