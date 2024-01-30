const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Adjust the path if needed
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');


// Create a new post
router.post('/', createPost);

// Get all posts  
router.get('/', getAllPosts);

// Get a single post by ID
router.get('/:id', getPostById);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

module.exports = router;