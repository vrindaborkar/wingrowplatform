const express = require('express');
const router = express.Router();
const City = require('../models/City');

// Create a new city
router.post('/', async (req, res) => {
  try {
    const { name, stateId } = req.body;

    // Check if the city already exists
    const existingCity = await City.findOne({ name, stateId });
    if (existingCity) {
      return res.status(400).json({ message: 'City already exists' });
    }

    // Create new city
    const city = new City({ name, stateId });
    await city.save();

    res.status(201).json({ message: 'City created successfully', city });
  } catch (error) {
    res.status(500).json({ message: 'Error creating city', error });
  }
});

// Get all cities or filter by stateId
router.get('/', async (req, res) => {
  try {
    const { stateId } = req.query;

    // If stateId is provided, filter cities by that stateId
    const cities = stateId
      ? await City.find({ stateId }).populate('stateId')
      : await City.find().populate('stateId');

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cities', error });
  }
});

// Get a single city by its ID
router.get('/:cityId', async (req, res) => {
  try {
    const city = await City.findById(req.params.cityId).populate('stateId');

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving city', error });
  }
});

// Update a city by its ID
router.put('/:cityId', async (req, res) => {
  try {
    const { name, stateId } = req.body;

    // Find city by ID and update
    const updatedCity = await City.findByIdAndUpdate(
      req.params.cityId,
      { name, stateId },
      { new: true, runValidators: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City updated successfully', updatedCity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating city', error });
  }
});

// Delete a city by its ID
router.delete('/:cityId', async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.cityId);

    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting city', error });
  }
});

module.exports = router;
