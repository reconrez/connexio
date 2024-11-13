const Post = require("../models/postSchema");
const Comment = require("../models/postCommentSchema");
var { v4: uuidv4 } = require('uuid');

const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      post_id: uuidv4(),
      ...req.body
    });
    // console.log(`newPost: ${newPost}`);
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
  
  const addComment = async (req, res) => {
    const { postId, userId, content } = req.body;
  
    try {
      const comment = new Comment({ postId, userId, content });
      await comment.save();
  
      await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
  
      res.status(201).json({ message: 'Comment added successfully', data: comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding comment', error });
    }
  };
  
  const getComments = async (req, res) => {
      const { postId } = req.params;
    
      try {
        const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
        res.status(200).json(comments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments', error });
      }
    };

  const deleteComments = async (req, res) => {
      const { commentId } = req.params;
    
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
    
        await Post.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });
        await Comment.findByIdAndDelete(commentId);
    
        res.status(200).json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting comment', error });
      }
    };

    const addOrRemoveLike = async (req, res) => {
      const { postId, userId } = req.body;
    
      try {
        // Check if the user already liked the post
        const existingLike = await Like.findOne({ postId, userId });
    
        if (existingLike) {
          // If like exists, remove it (unlike the post)
          await existingLike.deleteOne();
          await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
    
          return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
          // If like does not exist, add a new like
          const like = new Like({ postId, userId });
          await like.save();
          await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    
          return res.status(201).json({ message: 'Post liked successfully' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating like', error });
      }
    };
  

module.exports = { 
  createPost,
  getAllPosts, 
  getPostById, 
  updatePost, 
  deletePost,
  addComment,
  getComments,
  deleteComments,
  addOrRemoveLike
};