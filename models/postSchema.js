const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    post_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
      default: "assets/img/default-avatar.png",
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
    like: [
      {
        user_id: {
          type: String,
        },
        username: {
          type: String,
        },
        profilePicture: {
          type: String,
        }
      },
    ],
  });
  
  module.exports = mongoose.model('Post', PostSchema);