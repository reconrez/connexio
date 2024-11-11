const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model for the sender
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model for the receiver
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000 // Limit message content to 1000 characters
  },
  isRead: {
    type: Boolean,
    default: false // Track whether the message has been read
  },
  sentAt: {
    type: Date,
    default: Date.now // Timestamp for when the message was sent
  }
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;