const express = require('express');
const router = express.Router();
const moment = require('moment');
const dayjs = require('dayjs');
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
        console.error('Error fetching markets:', error);
        res.status(500).json({ message: 'Server error fetching markets', error: error.message });
    }
});

// POST: Create a new market
router.post('/markets', async (req, res) => {
    try {
        const { name, city, state, location, address, marketDay, totalStalls } = req.body;

        if (!name || !city || !state || !location || !address || !marketDay || !totalStalls) {
            return res.status(400).json({ message: 'All fields must be provided' });
        }

        const newMarket = new Market({
            name,
            city,
            state,
            location,
            address,
            marketDay,
            totalStalls
        });

        await newMarket.save();

        res.status(201).json({
            message: 'Market created successfully',
            newMarket
        });
    } catch (error) {
        console.error('Error creating market:', error);
        res.status(500).json({ message: 'Server error creating market', error: error.message });
    }
});

// POST: Search markets based on name, city, or state
router.post('/markets/search', async (req, res) => {
    try {
        const { name, city, state } = req.body;

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
        console.error('Error searching markets:', error);
        res.status(500).json({ message: 'Server error searching markets', error: error.message });
    }
});

// GET: Fetch stalls for a specific market based on location
router.get('/markets/:name/stalls', async (req, res) => {
    try {
        const { name } = req.params;

        const stalls = await Stalls.find({ name });

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


// GET: Check availability of stalls based on location and date
router.get('/stalls/availability', async (req, res) => {
    try {
        const { name, date } = req.query;

        if (!name || !date) {
            return res.status(400).json({ message: 'Location and Date are required' });
        }

        // Step 1: Format the provided date to "YYYY/MM/DD"
        const formattedDate = moment(date, ["YYYY/MM/DD", "YYYY-MM-DD"]).format("YYYY/MM/DD");

        // Step 2: Retrieve all stalls for the specified location from the Stalls collection
        const allStalls = await Stalls.find({ name });

        if (!allStalls.length) {
            return res.status(404).json({ message: 'No stalls found for this location' });
        }

        // Step 3: Retrieve booked stalls for the specified location and formatted date from the BookedStalls collection
        const bookedStalls = await BookedStalls.find({ name, date: formattedDate });

        // Step 4: Map out the stall numbers that are already booked
        const bookedStallNumbers = new Set(bookedStalls.map(stall => stall.stallNo));

        // Step 5: Create a response array that marks each stall as available or booked
        const stallsWithAvailability = allStalls.map(stall => ({
            id: stall._id,
            stallNo: stall.stallNo,
            stallName: stall.stallName,
            stallPrice: stall.stallPrice,
            address: stall.address,
            available: !bookedStallNumbers.has(stall.stallNo) // Check if stall is not in bookedStallNumbers set
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

// POST: Book multiple stalls across different markets and dates
router.post('/bookings/multiple-stalls', async (req, res) => {
    try {
        const bookingRequests = req.body;

        const bookingResults = [];

        for (const request of bookingRequests) {
            const { name, date, stalls, bookedBy } = request; // Added bookedBy field here
            const parsedDate = dayjs(date, ["YYYY/MM/DD", "YYYY-MM-DD"]).format("YYYY/MM/DD");    

            const market = await Market.findOne({ name});
            if (!market) {
                bookingResults.push({ name, date: parsedDate, status: 'Market not found' });
                continue;
            }

            for (const stallRequest of stalls) {
                const { stallNo, stallName, stallPrice } = stallRequest;

                const isBooked = await BookedStalls.findOne({
                    name,
                    date: parsedDate,
                    stallNo
                });

                if (isBooked) {
                    bookingResults.push({ name, date: parsedDate, stallNo, status: 'Already booked' });
                    continue;
                }

                const newBooking = new BookedStalls({
                    name,
                    date: parsedDate,
                    stallNo,
                    stallName,
                    stallPrice,
                    bookedBy, // Added bookedBy field here
                    isBooked: true
                });

                await newBooking.save();
                bookingResults.push({ name, date: parsedDate, stallNo, status: 'Booked successfully' });
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
