const express = require('express');
const router = express.Router();
const {
    createThread,
    getAllThreads,
    getThreadById,
    toggleThreadStatus,
    incrementThreadViews,
    deleteThread,
    addReply,
    getRepliesByThread,
    updateReply,
    deleteReply
} = require('../controllers/threadController');

// Routes for Thread CRUD operations
router.post('/threads', createThread); // Create thread
router.get('/threads', getAllThreads); // Get all threads
router.get('/threads/:threadId', getThreadById); // Get single thread
router.patch('/threads/:threadId/status', toggleThreadStatus); // Toggle thread open/close status
router.patch('/threads/:threadId/views', incrementThreadViews); // Increment views
router.delete('/threads/:threadId', deleteThread); // Delete thread
  
// Reply Routes
router.post('/replies', addReply); // Add reply to a thread
router.get('/replies/:threadId', getRepliesByThread); // Get all replies for a thread
router.patch('/replies/:replyId', updateReply); // Update a specific reply
router.delete('/replies/:replyId', deleteReply); // Delete a specific reply

module.exports = router;