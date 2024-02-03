var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const testRoutes = require("./routes/testRoutes");

var app = express();
const mongoURI = process.env.MONGO_URI;

// var uri = 'mongodb://localhost:27017/connexio';
// var uri = 'mongodb+srv://reconrez:ConnexioAtlas04@mark04.yriulzz.mongodb.net/';
// connect to MongoDB
mongoose.connect(mongoURI).then(() =>
    console.log('Connected to MongoDB'))
  .catch(err =>
    console.error('Error connecting to MongoDB:', err
    ));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view/dist/')));


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/home", postRoutes);
app.use("/discussions", discussionRoutes);
app.use("/testing", testRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("=================================");
console.log(uuidv4());

module.exports = app;