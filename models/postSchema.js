const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    post_id: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post_type: {
      type: String,
      enum: ['text', 'image', 'video', 'other'],
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'friends'],
      default: 'public',
    },
    reactions: [
      {
        type: {
          type: String,
          enum: ['like', 'dislike', 'love', 'other'],
        },
        user_id: {
          type: Number,
        },
      },
    ],
    comments: [
      {
        comment_id: {
          type: Number,
        },
        user_id: {
          type: Number,
        },
        content: {
          type: String,
        },
        created_at: {
          type: Date,
        },
      },
    ],
  });
  
  module.exports = mongoose.model('Post', PostSchema);