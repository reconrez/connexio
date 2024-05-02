var express = require('express');
const { findUserById } = require('../controllers/userController');
var router = express.Router();


/* GET users listing. */
router.post('/userProfile', function(req, res, next) {
    console.log(req.body);
});

// List all users (protected route)
router.get("/users", async (req, res) => {
    try {
      // Ensure the request is authenticated
      if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
  
      // Check if the authenticated user has the necessary role or permissions
      // (This is just a placeholder, you may replace it with your actual logic)
      if (!req.user.isAdmin) {
        return res.status(403).json({ msg: "Forbidden" });
      }
  
      // Fetch all users from the database
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

router.post("/user", findUserById)

module.exports = router;
