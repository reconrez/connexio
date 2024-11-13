const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    maxlength: 1000,
    default: ""
  },
  media: [
    {
      url: {
        type: String
      },
      type: {
        type: String,
        enum: ["image", "video"]
      }
    }
  ],
  visibility: {
    type: String,
    enum: ["public", "private"],
    required: true
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Update visibility based on user profile
PostSchema.pre('save', async function (next) {
  const User = mongoose.model('User');
  const user = await User.findById(this.userId);

  if (user) {
    this.visibility = user.visibility; // Set post visibility based on user profile
  }
  next();
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
