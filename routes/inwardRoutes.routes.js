const express = require('express');
const router = express.Router();
const Inward = require('../models/Inward');
// const userController = require('../controllers/user.controller'); // Import user controller

router.get('/api/inward', async (req, res) => {
    console.log('GET /api/inward route hit');
    try {
        const inwardData = await Inward.find();
        res.status(200).json(inwardData);
    } catch (error) {
        console.error('Error fetching inward data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router; // Export the router

