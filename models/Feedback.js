const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who provided the feedback
  stars: Number,
  message: String,
}, {
  bufferCommands: true,
  autoCreate: false
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
