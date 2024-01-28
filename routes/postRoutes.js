const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Adjust the path if needed

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;