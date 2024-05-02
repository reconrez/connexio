const User = require("../models/userSchema");

const findUserById = async (req, res) => {
  console.log("works");
  console.log(req.body);
  try {
    const fetchUser = await User.find(req.body);
    const user = fetchUser[0];
    const limitedUserData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      followings: user.followings,
      createdAt: user.createdAt,
    };
    console.log("success");
    console.log(limitedUserData);
    res.json(limitedUserData);
  } catch (err) {
    console.log("failure");
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  // TODO: Implement update user logic
};

const deleteUser = async (req, res) => {
  // TODO: Implement delete user logic
};

module.exports = { findUserById }