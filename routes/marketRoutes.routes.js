const express = require('express');
const router = express.Router();
const Market = require('../models/Market');
const Stalls = require('../models/Stalls');
const BookedStalls = require('../models/BookedStalls'); 



// GET: Fetch markets by city, state, or name
router.get('/markets', async (req, res) => {
    try {
        const { city, state, name } = req.query;

        let query = {};
        if (city) query.city = city;
        if (state) query.state = state;
        if (name) query.name = name;

        const markets = await Market.find(query);

        if (!markets.length) {
            return res.status(404).json({ message: 'No markets found' });
        }

        res.status(200).json({
            message: 'Markets retrieved successfully',
            markets
        });
    } catch (error) {
        console.error('Error fetching markets:', error); // Log detailed error
        res.status(500).json({ message: 'Server error fetching markets', error: error.message });
    }
});

// POST: Create a new market (without stalls)
router.post('/markets', async (req, res) => {
    try {
        const { name, city, state, location, address, marketDay, totalStalls } = req.body;

        // Ensure that all required fields are provided
        if (!name || !city || !state || !location || !address || !marketDay || !totalStalls) {
            return res.status(400).json({ message: 'All fields including stallsAvailable must be provided' });
        }

        // Create a new market
        const newMarket = new Market({
            name,
            city,
            state,
            location,
            address,
            marketDay,
            totalStalls
        });

        // Save the new market to the database
        await newMarket.save();

        res.status(201).json({
            message: 'Market created successfully',
            newMarket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating market', error: error.message });
    }
});


// POST: Search markets based on name, city, or state
router.post('/markets/search', async (req, res) => {
    try {
        const { name, city, state } = req.body;

        // Validate if at least one search parameter is provided
        if (!name && !city && !state) {
            return res.status(400).json({ message: 'Please provide at least one search parameter (name, city, or state)' });
        }

        let query = {};
        if (name) query.name = name;
        if (city) query.city = city;
        if (state) query.state = state;

        const markets = await Market.find(query);

        if (!markets.length) {
            return res.status(404).json({ message: 'No markets found' });
        }

        res.status(200).json({
            message: 'Markets retrieved successfully',
            markets
        });
    } catch (error) {
        console.error('Error searching markets:', error); // Log detailed error
        res.status(500).json({ message: 'Server error searching markets', error: error.message });
    }
});

// GET: Fetch stalls for a specific market based on location
router.get('/markets/:location/stalls', async (req, res) => {
    try {
        const { location } = req.params;

        // Find stalls by market location
        const stalls = await Stalls.find({ location});

        if (!stalls.length) {
            return res.status(404).json({ message: 'No stalls found for this market' });
        }

        res.status(200).json({
            message: 'Stalls retrieved successfully',
            stalls
        });
    } catch (error) {
        console.error('Error fetching stalls:', error);
        res.status(500).json({ message: 'Server error fetching stalls', error: error.message });
    }
});

// Inside marketRoutes.js
router.get('/stalls/availability', async (req, res) => {
    try {
        const { location, date } = req.query;

        if (!location || !date) {
            return res.status(400).json({ message: 'Location and Date are required' });
        }
        const stalls = await Stalls.find({ location});
        const bookedStalls = await BookedStalls.find({ location, date });
        const bookedStallIds = bookedStalls.map(stall => stall.stallNo);

     

        const stallsWithAvailability = stalls.map(stalls => ({
            stallNo: stalls.stallNo,
            stallName: stalls.stallName,
            stallPrice: stalls.stallPrice,
            address: stalls.address,
            available: !bookedStallIds.includes(stalls.stallNo)
        }));

        res.status(200).json({
            message: 'Stalls availability retrieved successfully',
            stalls: stallsWithAvailability
        });
    } catch (error) {
        console.error('Error fetching available stalls:', error);
        res.status(500).json({ message: 'Server error fetching available stalls', error: error.message });
    }
});
// Fetch available stalls for a specific market on a specific date
exports.getAvailableStalls = async (req, res) => {
    try {
        const { location, date } = req.query;

        if (!location || !date) {
            return res.status(400).json({ message: 'Market ID and date are required' });
        }

        // Fetch the stalls in the specified market
        const stalls = await Stalls.find({ location});

        // Fetch booked stalls on the specified date
        const bookedStalls = await BookedStalls.find({ location, date });

        // Get the IDs of booked stalls for the specified date
        const bookedStallIds = bookedStalls.map(stall => stall.stallNo);

        // Mark each stall as booked or available
        const stallsWithAvailability = stalls.map(stall => ({
            stallNo: stall.stallNo,
            stallName: stall.stallName,
            stallPrice: stall.stallPrice,
            address: stall.address,
            available: !bookedStallIds.includes(stall.stallNo)
        }));

        res.status(200).json({
            message: 'Stalls availability retrieved successfully',
            stalls: stallsWithAvailability
        });
    } catch (error) {
        console.error('Error fetching available stalls:', error);
        res.status(500).json({ message: 'Server error fetching available stalls', error: error.message });
    }
};

// POST: Book multiple stalls across different markets and dates
router.post('/bookings/multiple-stalls', async (req, res) => {
    try {
        const bookingRequests = req.body; // Array of booking requests as per payload

        const bookingResults = [];

        for (const request of bookingRequests) {
            const { location, date, stalls } = request;

            // Check if the market with the specified location exists
            const market = await Market.findOne({ location });
            if (!market) {
                bookingResults.push({ location, date, status: 'Market not found' });
                continue;
            }

            // Process each stall in the request
            for (const stallRequest of stalls) {
                const { stallNo, stallName, stallPrice } = stallRequest;

                // Check if the stall is already booked for the specified date and location
                const isBooked = await BookedStalls.findOne({
                    location,
                    date,
                    stallNo
                });

                if (isBooked) {
                    bookingResults.push({ location, date, stallNo, status: 'Already booked' });
                    continue;
                }

                // Book the stall by creating a new record in BookedStalls
                const newBooking = new BookedStalls({
                    location,
                    date,
                    stallNo,
                    stallName,
                    stallPrice
                });

                await newBooking.save();
                bookingResults.push({ location, date, stallNo, status: 'Booked successfully' });
            }
        }

        res.status(200).json({
            message: 'Multiple stalls booking process completed',
            bookingResults
        });
    } catch (error) {
        console.error('Error booking multiple stalls:', error);
        res.status(500).json({ message: 'Server error booking multiple stalls', error: error.message });
    }
});

// GET: Fetch all booked stalls from all markets
router.get('/booked-stalls', async (req, res) => {
    try {
        // Fetch all booked stalls from the BookedStalls collection
        const bookedStalls = await BookedStalls.find();

        if (!bookedStalls.length) {
            return res.status(404).json({ message: 'No booked stalls found' });
        }

        res.status(200).json({
            message: 'Booked stalls retrieved successfully',
            bookedStalls
        });
    } catch (error) {
        console.error('Error fetching booked stalls:', error);
        res.status(500).json({ message: 'Server error fetching booked stalls', error: error.message });
    }
});


module.exports = router;
