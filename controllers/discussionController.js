const Discussion = require('../models/discussionSchema');

// Get all discussions
const getDiscussions = async (req, res) => {
    try {
      const discussions = await Discussion.find();
      res.json(discussions); 
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error retrieving discussions'});
    }
  }
  
  // Create a new discussion
  const createDiscussion = async (req, res) => {
    try {
      console.log("=================================");
      console.log(req.body);
      const discussion = new Discussion(req.body);
      const savedDiscussion = await discussion.save();
      res.json(savedDiscussion);
    } catch (err) {
      console.error(err);
      res.status(400).json({message: 'Error creating discussion'});
    }
  }
  
  // Get a single discussion
  const getDiscussionById = async (req, res) => {
    try {
      const id = req.params.id;
      const discussion = await Discussion.findById(id);
      if (!discussion) {
        return res.status(404).json({message: 'Discussion not found'});
      }
      res.json(discussion);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error retrieving discussion'});
    }
  }
  
  // Update a discussion
  const updateDiscussion = async (req, res) => {
    try {
      const id = req.params.id;
      const discussion = await Discussion.findByIdAndUpdate(id, req.body, {new: true});
      if (!discussion) {
        return res.status(404).json({message: 'Discussion not found'});
      }
      res.json(discussion);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error updating discussion'});
    }
  }
  
  // Delete a discussion
  const deleteDiscussion = async (req, res) => {
    try {
      const id = req.params.id;
      await Discussion.findByIdAndDelete(id);
      res.json({message: 'Discussion deleted successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting discussion'});
    }
  }

  module.exports = {getDiscussions, createDiscussion, getDiscussionById, updateDiscussion, deleteDiscussion};