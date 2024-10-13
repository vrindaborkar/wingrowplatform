const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true,
        // unique: true
    },
    stateCode: {
        type: String,
        required: true,
        // unique: true
    }
});

module.exports = mongoose.model('State', StateSchema);
