const app = require('express');
const authService = require('../services/authenticationService');

const router = app.Router();

// router.get('/hello', authService.hello);
// router.get('/signup', authService.signupGet);
// router.post('/signup', authService.signupPost);
// router.get('/login', authService.loginGet);
// router.post('/login', authService.loginPost);

module.exports = router;