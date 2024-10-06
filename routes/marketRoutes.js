const express = require('express');
const router = express.Router();
const Market = require('../models/Market');  // Assuming you have a Market model
const City = require('../models/City');      // Assuming you have a City model

// GET: Fetch markets by city ID or name
router.get('/markets', async (req, res) => {
    try {
        const { cityId, cityName } = req.query;
        
        let city;
        
        if (cityId) {
            city = await City.findById(cityId);
        } else if (cityName) {
            city = await City.findOne({ name: cityName });
        } else {
            return res.status(400).json({ message: 'Please provide either cityId or cityName' });
        }

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        const markets = await Market.find({ cityId: city._id });

        if (!markets.length) {
            return res.status(404).json({ message: 'No markets found for this city' });
        }

        res.status(200).json({
            message: `Markets retrieved for city ${city.name}`,
            markets
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching markets' });
    }
});

module.exports = router;
