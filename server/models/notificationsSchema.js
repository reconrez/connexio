const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // References the User receiving the notification
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // References the User who triggered the notification
  },
  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'mention'], // Example notification types
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // ID of the entity (post, comment, etc.) related to the notification
  },
  message: {
    type: String,
    default: '' // Custom message for notification
  },
  isRead: {
    type: Boolean,
    default: false
  },
  deleteAfterDays: {
    type: Number,
    enum: [7, 14, 30],
    default: 30 // Default to 30 days if no preference is set
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;