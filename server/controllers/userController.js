const User = require("../models/userSchema");

const findUserById = async (req, res) => {
  console.log("works");
  try {
    const fetchUser = await User.find(req.body);
    console.log(req.body);
    console.log("+++++++++++++++++++++++++++++++");
    console.log("=============================================");
    console.log(fetchUser);
    console.log(fetchUser.length);
    if(fetchUser.length > 0){
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
      // console.log(limitedUserData);
      res.json(limitedUserData);
    }
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