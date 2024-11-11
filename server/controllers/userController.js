const { User, Follow } = require("../models/userSchema");
const { createNotification } = require('./notificationController');

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

// Function to follow/unfollow a user
const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({ followerId, followingId });
    
    if (existingFollow) {
      // If already following, unfollow
      await Follow.deleteOne({ followerId, followingId });
      return res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      // If not following, create new follow
      const newFollow = new Follow({ followerId, followingId });
      await newFollow.save();
      
      await createNotification({
        receiverId: followingId,
        senderId: followerId,
        type: 'follow',
        entityId: followerId,
        message: 'You have a new follower!'
      });
            
      return res.status(201).json({ message: 'User followed successfully & notification created.' });


    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while following/unfollowing the user', error });
  }
};

module.exports = { findUserById, followUser }