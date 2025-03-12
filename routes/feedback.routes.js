const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
// const { verifyToken } = require('../middlewares/auth.jwt'); // Import `verifyToken` from middlewares

// POST: Add new feedback (protected route)
router.post('/feedback', feedbackController.addFeedback);

router.get('/feedback/user/:userId', feedbackController.getFeedbackByUser);


// router.post('/api/feedback', verifyToken, feedbackController.addFeedback);

// GET: Retrieve all feedback
router.get('/feedback', feedbackController.getAllFeedback);

module.exports = router;
