const Market = require('../models/Market');
const Stalls = require('../models/Stalls');
const BookedStall = require('../models/BookedStall');

// Fetch all markets by city, state, or name
exports.getMarkets = async (req, res) => {
    try {
        const { city, state, name } = req.query;
        let query = {};

        if (city) query.city = city;
        if (state) query.state = state;
        if (name) query.name = name;

        const markets = await Market.find(query);

        if (!markets.length) {
            return res.status(404).json({ message: 'No markets found' });
        }

        res.status(200).json({
            message: 'Markets retrieved successfully',
            markets
        });
    } catch (error) {
        console.error('Error fetching markets:', error);
        res.status(500).json({ message: 'Server error fetching markets', error: error.message });
    }
};

// Create a new market
exports.createMarket = async (req, res) => {
    try {
        const { name, city, state, location, address, marketDay, totalStalls } = req.body;

        if (!name || !city || !state || !location || !address || !marketDay || !totalStalls) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMarket = new Market({
            name,
            city,
            state,
            location,
            address,
            marketDay,
            totalStalls
        });

        await newMarket.save();

        res.status(201).json({
            message: 'Market created successfully',
            newMarket
        });
    } catch (error) {
        console.error('Error creating market:', error);
        res.status(500).json({ message: 'Server error creating market', error: error.message });
    }
};

// Fetch stalls for a specific market
exports.getMarketStalls = async (req, res) => {
    try {
        const { marketId } = req.params;

        if (!marketId) {
            return res.status(400).json({ message: 'Market ID is required' });
        }

        const stalls = await Stalls.find({ location: marketId });

        if (!stalls.length) {
            return res.status(404).json({ message: 'No stalls found for this market' });
        }

        res.status(200).json({
            message: 'Stalls retrieved successfully',
            stalls
        });
    } catch (error) {
        console.error('Error fetching stalls:', error);
        res.status(500).json({ message: 'Server error fetching stalls', error: error.message });
    }
};

// Fetch market details including dynamic stallsAvailable calculation
exports.getMarketDetails = async (req, res) => {
    try {
        const { marketId } = req.params;

        if (!marketId) {
            return res.status(400).json({ message: 'Market ID is required' });
        }

        const market = await Market.findById(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        // Find all booked stalls related to this market
        const bookedStallsCount = await BookedStall.countDocuments({ market: marketId });

        // Calculate available stalls dynamically
        const stallsAvailable = market.totalStalls - bookedStallsCount;

        res.status(200).json({
            message: 'Market retrieved successfully',
            market: {
                ...market.toObject(),
                stallsAvailable  // Dynamically calculated stallsAvailable
            }
        });
    } catch (error) {
        console.error('Error fetching market details:', error);
        res.status(500).json({ message: 'Server error fetching market details', error: error.message });
    }
};
