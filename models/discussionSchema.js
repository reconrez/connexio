// models/discussion.js
const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  open: { type: Boolean, default: true },
  pinned: { type: Boolean, default: false },
  closed_at: Date,
  comment_count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Discussion', discussionSchema);