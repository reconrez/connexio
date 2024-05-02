const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Adjust the path if needed
const { createPost, getAllPosts, getPostById, updatePost, deletePost, createComment, getAllComments, deleteComment } = require('../controllers/postController');


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

// Create a new comment
router.post('/comment', createComment);

// Get all comments  
router.post('/comments', getAllComments);

// Delete a comment
router.delete('/comment/:id', deleteComment);
module.exports = router;