const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookedStalls = require('../models/BookedStalls');
const Stalls = require('../models/Stalls');
const State = require('../models/State'); // Importing the State model

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

// Existing GET routes (for reference)
router.get('/booked-stalls/:farmerId', async (req, res) => {
    try {
        const farmerId = req.params.farmerId;
        const bookedStalls = await BookedStalls.find({ bookedBy: farmerId }).populate('stallId');

        if (!bookedStalls.length) {
            return res.status(404).json({ message: 'No booked stalls found for this farmer' });
        }

        res.status(200).json({
            message: 'Retrieved booked stalls successfully',
            bookedStalls
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving booked stalls' });
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



module.exports = router;
