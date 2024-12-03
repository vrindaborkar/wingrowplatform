const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StallSchema = new Schema({
    stallNo: { type: Number, required: true },
    stallName: { type: String, required: true },
    price: { type: Number, required: true }
});

const MultipleStallsBookingSchema = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    stalls: [StallSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MultipleStallsBooking', MultipleStallsBookingSchema);
