const app = require('express');
const authService = require('../middleware/authMiddleware');

const router = app.Router();
const { register, login, logout } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", authenticateToken, (req, res) => {
  // Access the authenticated user's information
  console.log("Get Profile =============");
  res.json(req.user);
});

module.exports.hello = ()=>{
    console.log("Hello")
};
module.exports = router;