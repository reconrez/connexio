const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, markMessageAsRead } = require('../controllers/messageController');

// Route to send a message
router.post('/send', sendMessage);

// Route to get conversation between two users
router.get('/conversation/:userId1/:userId2', getConversation);

// Route to mark a message as read
router.put('/mark-as-read/:messageId', markMessageAsRead);

// Route to delete a message (hard delete)
router.delete('/delete/:messageId', deleteMessage);

module.exports = router;
