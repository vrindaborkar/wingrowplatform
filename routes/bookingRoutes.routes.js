const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookedStalls = require('../models/BookedStalls');
const Stalls = require('../models/Stalls');
const State = require('../models/State'); // Importing the State model
const Market = require('../models/Market'); // Import the Market model

// POST: Book multiple stalls in different markets and dates
router.post('/book-multiple-stalls', async (req, res) => {
    try {
        const bookings = req.body; // array of bookings containing multiple markets
        const bookedStalls = [];

        // Loop through each booking request
        for (const booking of bookings) {
            const { market_name, date, stalls } = booking;

            // Loop through each stall in the market
            for (const stall of stalls) {
                const stallData = await Stalls.findById(stall.stall_id);

                if (!stallData) {
                    return res.status(404).json({ message: `Stall with ID ${stall.stall_id} not found` });
                }

                const newBookedStall = new BookedStalls({
                    stallId: stall.stall_id,
                    marketName: market_name,
                    date: date,
                    stallPrice: stall.price,
                    isBooked: true,
                    bookedBy: req.user.id, // assuming you have some user identification
                    bookedAt: new Date().toISOString(),
                    stallNo: stallData.stallNo
                });

                await newBookedStall.save();
                bookedStalls.push(newBookedStall);
            }
        }

        res.status(201).json({
            message: 'Stalls successfully booked across multiple markets',
            bookedStalls
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during stall booking' });
    }
});



// GET: Retrieve booked stalls by farmer ID
router.get('/booked-stalls/:id', async (req, res) => {
    try {
        console.log("Received request for booked stall with ID:", req.params.id);

        // Use BookedStalls instead of Booking
        const bookedStall = await BookedStalls.findById(req.params.id);

        if (!bookedStall) {
            console.log("No stall found for this farmer ID:", req.params.id);
            return res.status(404).json({ message: 'No booked stalls found for this farmer' });
        }

        // Return the booked stall data
        res.status(200).json(bookedStall);
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ message: 'Server error', error });
    }
});






// GET: Retrieve all states
router.get('/states', async (req, res) => {
    try {
        const states = await State.find(); // Retrieve all states from the database

        if (!states.length) {
            return res.status(404).json({ message: 'No states found' });
        }

        res.status(200).json({
            message: 'States retrieved successfully',
            states
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving states' });
    }
});

// GET: Search markets by city and state
router.get('/markets/search', async (req, res) => {
    try {
        const { city, state } = req.query; // Get city and state from query parameters

        // Build the query based on provided parameters
        const query = {};
        if (city) query.location = city; // Filter by city if provided
        if (state) query.state = state;   // Filter by state if provided

        const markets = await Market.find(query); // Find markets matching the query

        if (!markets.length) {
            return res.status(404).json({ message: 'No markets found for the specified criteria' });
        }

        res.status(200).json({
            message: 'Markets retrieved successfully',
            markets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while searching markets' });
    }
});

module.exports = router;
