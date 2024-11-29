const Feedback = require('../models/Feedback');
const User = require('../models/User'); // Assuming User schema is already set up

// POST: Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { message, stars, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new feedback
    const feedback = new Feedback({
      user: userId,
      message,
      stars
    });

    const savedFeedback = await feedback.save();
    res.status(201).json({ message: 'Feedback added successfully', data: savedFeedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Server error while adding feedback' });
  }
};

exports.getFeedbackByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find feedback for the specific user
    const feedbackList = await Feedback.find({ user: userId }).populate('user', 'firstname lastname phone');
    if (!feedbackList.length) {
      return res.status(404).json({ message: 'No feedback found for this user' });
    }

    res.status(200).json({ feedback: feedbackList });
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({ message: 'Server error while retrieving feedback' });
  }
};
// GET: Retrieve all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().populate('user', 'firstname lastname phone'); // Populate user details if needed
    res.status(200).json({ feedback: feedbackList });
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({ message: 'Server error while retrieving feedback' });
  }
};
