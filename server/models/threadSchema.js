const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  repliesCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open" // New threads default to "open"
  }
}, { timestamps: true });

const Thread = mongoose.model('Thread', ThreadSchema);
module.exports = Thread;