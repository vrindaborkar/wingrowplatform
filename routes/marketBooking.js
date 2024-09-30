const express = require('express');
const router = express.Router();
const Stall = require('../models/Stalls');
const Market = require('../models/Market');

// POST API for booking multiple stalls across markets
router.post('/api/bookMultipleStalls', async (req, res) => {
  const { bookings } = req.body; // bookings: array of {marketId, stallId, bookingDate}

  try {
    const bookingPromises = bookings.map(async booking => {
      const { marketId, stallId, bookingDate } = booking;

      // Find market and stall by IDs and check availability
      const market = await Market.findById(marketId);
      if (!market) throw new Error(`Market with ID ${marketId} not found`);

      const stall = await Stall.findOne({ _id: stallId, marketId, isBooked: false });
      if (!stall) throw new Error(`Stall with ID ${stallId} in Market ${market.marketName} is unavailable`);

      // Mark the stall as booked and assign booking date
      stall.isBooked = true;
      stall.bookingDate = new Date(bookingDate);
      return stall.save();
    });

    // Wait for all booking operations to complete
    await Promise.all(bookingPromises);

    res.status(200).json({ message: 'Stalls successfully booked in multiple markets!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
