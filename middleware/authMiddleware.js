var users = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ error: 'Invalid token.' });
    }

    console.log('User authenticated:', user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;


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

// module.exports = [
    // signupGet,
    // loginGet,
    // signupPost,
    // loginPost,
    // hello
// ]

// module.exports = app;