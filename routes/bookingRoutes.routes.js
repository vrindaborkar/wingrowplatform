const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookedStalls = require('../models/BookedStalls');
const Stalls = require('../models/Stalls');
const State = require('../models/State'); // Importing the State model
const Market = require('../models/Market'); // Import the Market model
// const MultipleStallsBooking = require('../models/MultipleStallsBooking'); // Import the new schema


// GET: Retrieve booked stalls by farmer ID (bookedBy field)
router.get('/booked-stalls/:bookedBy', async (req, res) => {
    try {
        console.log("API hit: GET booked-stalls/:bookedBy with ID:", req.params.bookedBy);
        const { bookedBy } = req.params;

        // Find all booked stalls for the specified bookedBy ID
        const bookedStalls = await BookedStalls.find({ bookedBy: bookedBy.trim() });

        if (!bookedStalls || bookedStalls.length === 0) {
            return res.status(404).json({ message: 'No booked stalls found for this farmer' });
        }

        res.status(200).json({
            message: 'Booked stalls retrieved successfully',
            bookedStalls
        });
    } catch (error) {
        console.error('Error retrieving booked stalls:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});





// Existing routes...

router.post('/states', async (req, res) => {
    try {
        const { stateName, stateCode } = req.body;

        if (!stateName || !stateCode) {
            return res.status(400).json({ message: 'stateName and stateCode are required' });
        }

        const existingState = await State.findOne({ stateCode });
        if (existingState) {
            return res.status(409).json({ message: 'State with this code already exists' });
        }

        const newState = new State({
            stateName,
            stateCode
        });

        await newState.save();
        res.status(201).json({ message: 'State added successfully', state: newState });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Duplicate entry detected. State already exists.' });
        } else {
            console.error('Error adding state:', error);
            res.status(500).json({ message: 'Server error while adding state' });
        }
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
