const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    marketName: String,
    location: String
});

module.exports = mongoose.model('Market', marketSchema);
