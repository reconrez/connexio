const app = require('express');
const authService = require('../middleware/authMiddleware');

const router = app.Router();

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


// router.get('/hello', authService.hello);
// router.get('/signup', authService.signupGet);
// router.post('/signup', authService.signupPost);
// router.get('/login', authService.loginGet);
// router.post('/login', authService.loginPost);

module.exports.hello = ()=>{
    console.log("Hello")
};
module.exports = router;