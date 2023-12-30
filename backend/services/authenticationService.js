var users = require('../models/users.js');
var express = require('express');
var app = express();

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

module.exports.hello = ()=>{
    console.log("Hello")
};

// app.get('/', (req, res) => {
//     hello()
// });

// app.get('/users', (req, res) => {
   
//     console.log("Hello")
//         users.find({}, (err, users) => {
//             if (err) throw err;
//             console.log(users);
//             res.send(users);
//         });
   
//         res.status(500).send(err);

// });

module.exports = [
    signupGet,
    // loginGet,
    // signupPost,
    // loginPost,
    // hello
]

module.exports = app;