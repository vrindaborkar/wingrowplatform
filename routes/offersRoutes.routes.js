const express = require('express');
const router = express.Router();
const Market = require('../models/Market');
const Offer = require('../models/Offers');
const { verifyToken } = require('../middlewares/auth.jwt');
const isAdmin = require('../middlewares/auth.isAdmin');

// Admin adds or updates offers for a specific market
router.post('/admin/offers', [verifyToken, isAdmin], async (req, res) => {
    // router.post('/admin/offers', async (req, res) => {


    try {
        const { name, offers } = req.body;

        if (!name || !offers || !Array.isArray(offers)) {
            return res.status(400).json({ message: 'Market name and valid offers are required' });
        }

        const market = await Market.findOne({ name });
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        await Offer.updateOne(
            { name },
            { $set: { offers } },
            { upsert: true }
        );

        res.status(200).json({ message: 'Offers updated successfully' });
    } catch (error) {
        console.error('Error updating offers:', error);
        res.status(500).json({ message: 'Server error while updating offers' });
    }
});

// Get offers for customer dashboard for a specific market
router.get('/offers/:name', async (req, res) => {
    try {
        const { name } = req.params;

        const offerData = await Offer.findOne({ name });
        if (!offerData) {
            return res.status(404).json({ message: 'No offers found for this market' });
        }

        res.status(200).json({ offers: offerData.offers });
    } catch (error) {
        console.error('Error retrieving offers:', error);
        res.status(500).json({ message: 'Server error while retrieving offers' });
    }
});

module.exports = router;
