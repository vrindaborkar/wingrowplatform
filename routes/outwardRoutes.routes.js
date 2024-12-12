const express = require('express');
const router = express.Router();
const Outward = require('../models/Outward');
// const userController = require('../controllers/user.controller'); // Import user controller

router.get('/api/outward', async (req, res) => {
    console.log('GET /api/outward route hit');
    try {
        const outwardData = await Outward.find();
        res.status(200).json(outwardData);
    } catch (error) {
        console.error('Error fetching inward data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; // Export the router

