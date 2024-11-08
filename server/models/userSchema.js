const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  bio: {
    type: String,
    max: 50,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "assets/img/default-avatar.png",
  },
  role: {
    type: String,
    enum: ["admin", "individual", "business" ],
    required: true,
    default: "individual",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  }
}, {
  timestamps: true
});

const FollowSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // References the User model for the follower
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // References the User model for the followed user
    },
  },
  { timestamps: true }
);

// Optional: Add compound index to prevent duplicate follows
FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

const Follow = mongoose.model('Follow', FollowSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Follow, User };