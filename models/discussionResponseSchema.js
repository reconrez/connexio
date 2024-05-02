const { response } = require('express');
const mongoose = require('mongoose');

const DiscussionResponseSchema = new mongoose.Schema({
  discussion_id: {
    type: String,
    ref: 'Discussion',
    required: true
  },
  response_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User',
  },
  response: {
    type: String,
    required: true
  },
  likes: [
    {
      user_id: {
        type: String,
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DiscussionResponse', DiscussionResponseSchema);