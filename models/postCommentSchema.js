const mongoose = require("mongoose");

const PostCommentsSchema = new mongoose.Schema({

    post_id: {
        type: String,
        required: true,
    },
    comment_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    username: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    comment: {
        type: String,
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
    created_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('PostComments', PostCommentsSchema);