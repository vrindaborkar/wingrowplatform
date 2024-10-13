const express = require('express');
const router = express.Router();
const City = require('../models/City');
const CityController = require('../controllers/CityController'); // Adjust the path as necessary

// POST route to add a city
router.post('/', CityController.addCity); // Adjust the controller method as needed

// GET all cities or filter by stateId
router.get('/', CityController.getAllCities); // Use your controller method to get cities

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
