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

router.get('/api/inward/filtered', async (req, res) => {
    const { name, date } = req.query;
    try {
        const formattedDate = new Date(date);
        const inwardData = await Inward.find({ name, date: formattedDate });
        res.status(200).json(inwardData);
    } catch (error) {
        console.error('Error fetching inward data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// router.post('/', controller.postInward);

module.exports = router; // Export the router

