const Notification = require('../models/notificationsSchema');
const User = require('../models/userSchema'); // Optional, in case user details are needed for messages

// Centralized function to create a notification
const createNotification = async ({ receiverId, senderId, type, entityId, message }) => {
  try {
    // Check if the required fields are present
    if (!receiverId || !senderId || !type || !entityId) {
      throw new Error('Missing required fields to create a notification');
    }

    const newNotification = new Notification({
      receiverId,
      senderId,
      type,
      entityId,
      message
    });

    await newNotification.save();
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Controller function to get a user's notifications
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ receiverId: userId })
      .populate('senderId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Controller function to mark notifications as read
const markNotificationsAsRead = async (req, res) => {
  try {
    const { notificationIds } = req.body;

    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking notifications as read', error });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationsAsRead
};