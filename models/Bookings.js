const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    // Define fields according to your data model
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
    stallName: String,
    stallPrice: Number,
    name: String,
    // other fields...
});

module.exports = mongoose.model('Booking', bookingSchema);
