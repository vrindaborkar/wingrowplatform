const express = require('express');
const router = express.Router();
const Market = require('../models/Market');  // Ensure the path is correct
const { verifyToken } = require('../middlewares/auth.jwt');  // Admin authorization middleware
const isAdmin = require('../middlewares/auth.isAdmin'); // Import isAdmin middleware

/// Admin adds or updates offers for a specific market
router.post('/admin/offers', [verifyToken, isAdmin], async (req, res) => {
    try {
        const { marketId, offers } = req.body;

        // Validate if market ID and offers are provided
        if (!marketId || !offers || !Array.isArray(offers)) {
            return res.status(400).json({ message: 'Market ID and valid offers are required' });
        }

        // Find the market by ID
        const market = await Market.findById(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        // Create or update offers for the given market
        await offers.updateOne(
            { marketId },
            { $set: { offers } },
            { upsert: true } // Use upsert to insert if the offer does not exist
        );

        res.status(200).json({ message: 'Offers updated successfully' });
    } catch (error) {
        console.error('Error updating offers:', error);
        res.status(500).json({ message: 'Server error while updating offers' });
    }
});

// Get offers for customer dashboard for a specific market
router.get('/offers/:marketId', async (req, res) => {
    try {
        const { marketId } = req.params;

        // Find the offers for the given market ID
        const offerData = await Offer.findOne({ marketId });
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
