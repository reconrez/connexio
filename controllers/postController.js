const Post = require("../models/postSchema");

const createPost = async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }
  
  const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
  
  const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        res.status(404).json({
          error: 'Post not found'
        });
      } else {
        res.json(post);
      }
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
  
  const updatePost = async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body, {
          new: true
        }
      );
      if (!updatedPost) {
        res.status(404).json({
          error: 'Post not found'
        });
      } else {
        res.json(updatedPost);
      }
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }
  
  const deletePost = async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        res.status(404).json({
          error: 'Post not found'
        });
      } else {
        res.json({
          message: 'Post deleted successfully'
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
  
module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };