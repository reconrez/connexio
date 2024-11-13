const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Adjust the path if needed
const { createPost, getAllPosts, getPostById, updatePost, deletePost, addComment, getComments, deleteComments, addOrRemoveLike } = require('../controllers/postController');

// Create a new post
router.post('/post', createPost);

// Get all posts  
router.get('/posts', getAllPosts);

// Get a single post by ID
router.get('/post/:id', getPostById);

// Update a post
router.put('/post/:id', updatePost);

// Delete a post  
router.delete('/post/:id', deletePost);

// Routes for comments
router.post('/comments', addComment); // Add a comment
router.get('/comments/:postId', getComments); // Get comments for a post
router.delete('/comments/:commentId', deleteComments);

// Routes for likes
router.post('/like', addOrRemoveLike); // Handles both like and unlike in a single route

module.exports = router;