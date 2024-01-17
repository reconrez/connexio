const app = require('express');
const authService = require('../middleware/authMiddleware');

const router = app.Router();
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
signupGet = (req, res) => {
    res.render('SignupGet');
}
const loginGet = (req, res) => {
    res.render('LoginGet');
}
const signupPost = (req, res) => {
    res.render('SignUp Post');
}
const loginPost = (req, res) => {
    res.render('LoginPost');
}

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, (req, res) => {
  // Access the authenticated user's information
  console.log("Get Profile =============");
  res.json(req.user);
});

// router.get('/hello', authService.hello);
// router.get('/signup', authService.signupGet);
// router.post('/signup', authService.signupPost);
// router.get('/login', authService.loginGet);
// router.post('/login', authService.loginPost);

module.exports.hello = ()=>{
    console.log("Hello")
};
module.exports = router;