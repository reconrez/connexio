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
  description: {
    type: String,
    max: 50,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "YOUR_DEFAULT_AVATAR_URL",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
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

module.exports = mongoose.model("User", UserSchema);