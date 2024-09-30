const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
    stall_id: { type: String, required: true },
    stall_name: { type: String, required: true },
    price: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema({
    market_name: { type: String, required: true },
    date: { type: String, required: true },
    stalls: { type: [stallSchema], required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
