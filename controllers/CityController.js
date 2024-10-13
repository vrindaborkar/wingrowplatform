const City = require('../models/City'); // Adjust the path as necessary

exports.addCity = async (req, res) => {
  console.log(req.body); // Log incoming request body
  try {
    const { name, cityCode, stateId } = req.body; 
    const existingCity = await City.findOne({ name, stateId });
    if (existingCity) {
      return res.status(400).json({ message: 'City already exists' });
    }

    const newCity = new City({ name, cityCode, stateId });
    await newCity.save();
    return res.status(201).json(newCity);
  } catch (error) {
    console.error('Error adding city:', error); // Log error for debugging
    return res.status(500).json({ message: 'Error adding city', error });
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const { stateId } = req.query;
    const cities = stateId
      ? await City.find({ stateId }).populate('stateId')
      : await City.find().populate('stateId');

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cities', error });
  }
};
