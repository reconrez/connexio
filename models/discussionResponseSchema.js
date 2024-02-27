const mongoose = require('mongoose');

const DiscussionResponseSchema = new mongoose.Schema({
  discussion_id: {
    type: String,
    ref: 'Discussion',
    required: true
  },
  user_id: {
    type: String,
    ref: 'User',
  },
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      type: String,
      ref: 'User'
    }
  ],
  dislikes: [
    {
      type: String,
      ref: 'User'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('DiscussionResponse', DiscussionResponseSchema);