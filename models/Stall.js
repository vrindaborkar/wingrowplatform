const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
    stall_id: String,
    stall_name: String,
    price: Number,
    isBooked: { type: Boolean, default: false },
    bookingDate: Date,
    marketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Market' }
});

module.exports = mongoose.model('Stall', stallSchema);
