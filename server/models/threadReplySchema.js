const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Thread'
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
  }
}, { timestamps: true });

const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;