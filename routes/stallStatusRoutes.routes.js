const express = require('express');
const router = express.Router();
const Market = require('../models/Market');   // Assuming you have a Market model
const Stalls = require('../models/Stalls');   // Stalls model
const BookedStalls = require('../models/BookedStalls');  // BookedStalls model

// GET: Fetch stalls by market (ID or name) and date
router.get('/stalls', async (req, res) => {
    try {
        const { marketId, name, date } = req.query;

        // Find the market either by ID or name
        let market;
        if (marketId) {
            market = await Market.findById(marketId);
        } else if (name) {
            market = await Market.findOne({ name: name });
        } else {
            return res.status(400).json({ message: 'Please provide either marketId or marketName' });
        }

        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        // Find all stalls in this market
        const stalls = await Stalls.find({ name: market.name });

        if (!stalls.length) {
            return res.status(404).json({ message: 'No stalls found in this market' });
        }

        // Check the booking status of each stall for the provided date
        const stallsWithStatus = await Promise.all(stalls.map(async (stall) => {
            const bookedStall = await BookedStalls.findOne({
                stallId: stall._id,
                date: date,
                isBooked: true
            });

            return {
                ...stall._doc,
                status: bookedStall ? 'Booked' : 'Available'
            };
        }));

        res.status(200).json({
            message: `Stalls retrieved for market ${market.name} on ${date}`,
            stalls: stallsWithStatus
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching stalls' });
    }
});

module.exports = router;
