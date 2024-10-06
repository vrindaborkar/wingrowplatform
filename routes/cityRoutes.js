const express = require('express');
const router = express.Router();
const City = require('../models/City');
const State = require('../models/State');

// GET: Fetch cities by state ID or state name
router.get('/cities', async (req, res) => {
    try {
        const { stateId, stateName } = req.query;

        let state;
        
        if (stateId) {
            state = await State.findById(stateId);
        } else if (stateName) {
            state = await State.findOne({ name: stateName });
        } else {
            return res.status(400).json({ message: 'Please provide a stateId or stateName' });
        }

        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }

        const cities = await City.find({ stateId: state._id });

        if (!cities.length) {
            return res.status(404).json({ message: 'No cities found for this state' });
        }

        res.status(200).json({
            message: `Cities retrieved for ${state.name}`,
            cities
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching cities' });
    }
});

module.exports = router;
