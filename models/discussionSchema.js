// models/discussion.js
const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  discussion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  open: {
    type: Boolean,
    default: true
  },
  closed_at: Date,
  response_count: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);