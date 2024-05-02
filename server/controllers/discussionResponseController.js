 const Response = require('../models/discussionResponseSchema');
 var { v4: uuidv4 } = require('uuid');

const getResponses = async (req, res) => {
    try {
        const responses = await Response.find();
        res.json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error retrieving responses'
        });
    }
};

const getResponsesByDiscussionId = async (req, res) => {
    try {
        const discussionId = req.params.discussionId;
        const responses = await Response.find({
            discussion_id: discussionId
        });
        res.json(responses);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error retrieving responses'
        });
    }
};

const createResponse = async (req, res) => {
    console.log(req.body)
    try {
      const newResponse = new Response({
        response_id: uuidv4(),
        ...req.body
      });
      const savedResponse = await newResponse.save();
      res.status(201).json(savedResponse);
      console.log(`newResponse: ${newResponse}`);
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }

const updateResponse = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Response.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!response) {
            return res.status(404).json({
                message: 'Response not found'
            });
        }
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error updating response'
        });
    }
};

const deleteResponse = async (req, res) => {
    try {
        const id = req.params.id;
        await Response.findByIdAndDelete(id);
        res.json({
            message: 'Response deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error deleting response'
        });
    }
};

module.exports = {getResponses, getResponsesByDiscussionId, createResponse, updateResponse, deleteResponse};