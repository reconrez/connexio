const mongoose = require("mongoose");

const PostCommentsSchema = new mongoose.Schema({

    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    comment_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
    },
})

module.exports = mongoose.model('PostComments', PostCommentsSchema);