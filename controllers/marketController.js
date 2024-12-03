const Market = require('../models/Market');
const Stalls = require('../models/Stalls');
const BookedStall = require('../models/BookedStall');
const Offer = require('../models/Offer');

// Controller function to add a new offer
exports.addOffer = async (req, res) => {
  try {
    const { name, commodityName, quantity, offerRate, date, createdBy } = req.body;

    const newOffer = new Offer({
      name,
      commodityName,
      quantity,
      offerRate,
      date,
      createdBy
    });

    const savedOffer = await newOffer.save();

    res.status(201).json({
      success: true,
      message: 'Offer added successfully',
      data: savedOffer
    });

  } catch (error) {
    console.error('Error adding offer:', error);
    res.status(500).json({ success: false, message: 'Server error while adding offer' });
  }
};

exports.getOffersByMarket = async (req, res) => {
    try {
      const { name } = req.params;
  
      const offers = await Offer.find({ name });
  
      if (!offers.length) {
        return res.status(404).json({ message: 'No offers found for this market' });
      }
  
      res.status(200).json({
        success: true,
        offers
      });
  
    } catch (error) {
      console.error('Error fetching offers:', error);
      res.status(500).json({ success: false, message: 'Server error while fetching offers' });
    }
  };

  
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

        const stalls = await Stalls.find({ name: marketId });

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

exports.bookMultipleStalls = async (req, res) => {
    try {
        const bookingRequests = req.body; // Array of booking requests as per payload

        const bookingResults = [];

        for (const request of bookingRequests) {
            const { market_name, date, stalls } = request;

            // Find the market by name
            const market = await Market.findOne({ name: market_name });
            if (!market) {
                bookingResults.push({ market_name, date, status: 'Market not found' });
                continue;
            }

            // Process each stall in the request
            for (const stallRequest of stalls) {
                const { stall_id, stall_name, price } = stallRequest;

                // Check if the stall is already booked for the specified date
                const isBooked = await BookedStalls.findOne({
                    marketId: market._id,
                    date,
                    stallNo: stall_id
                });

                if (isBooked) {
                    bookingResults.push({ market_name, date, stall_id, status: 'Already booked' });
                    continue;
                }

                // Book the stall by creating a new record in BookedStalls
                const newBooking = new BookedStalls({
                    marketId: market._id,
                    date,
                    stallNo: stall_id,
                    stallName: stall_name,
                    stallPrice: price
                });

                await newBooking.save();
                bookingResults.push({ market_name, date, stall_id, status: 'Booked successfully' });
            }
        }

        res.status(200).json({
            message: 'Multiple stalls booking process completed',
            bookingResults
        });
    } catch (error) {
        console.error('Error booking multiple stalls:', error);
        res.status(500).json({ message: 'Server error booking multiple stalls', error: error.message });
    }
};

