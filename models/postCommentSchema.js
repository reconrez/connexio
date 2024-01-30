const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({

    post_id: {
        type: Number,
        required: true,
        unique: true,
    },
    comment_id: {
        type: Number,
        required: true,
        unique: true,
    },
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    content: {
        type: String,
    },
    created_at: {
        type: Date,
    },
})