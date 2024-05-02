const Discussion = require("../models/discussionSchema"); // Update path to your discussion model
const Response = require("../models/discussionResponseSchema"); // Update path to your response model
var { v4: uuidv4 } = require('uuid');

const createDiscussion = async (req, res) => {
  try {
    console.log(req.body)
    const newDiscussion = new Discussion({
      discussion_id: uuidv4(),
      ...req.body
    });
    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}

const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

const getDiscussionById = async (req, res) => {
  console.log(req.params);
  try {
    console.log(req.params.id);
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      res.status(404).json({
        error: 'Discussion not found'
      });
    } else {
      res.json(discussion);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

const updateDiscussion = async (req, res) => {
  try {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true
      }
    );
    if (!updatedDiscussion) {
      res.status(404).json({
        error: 'Discussion not found'
      });
    } else {
      res.json(updatedDiscussion);
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}

const  deleteDiscussion = async (req, res) => {
  console.log(req.params);
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!deletedDiscussion) {
      res.status(404).json({
        error: 'Discussion not found'
      });
    } else {
      res.json({
        message: 'Discussion deleted successfully'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

module.exports = { 
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
};