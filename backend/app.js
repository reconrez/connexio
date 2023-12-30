var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
const authRoutes = require('./routes/authRoutes');
const users = require('./routes/users');
const mongoose = require('mongoose');
const authService = require('./services/authenticationService');

var app = express();
app.use('/', users);
app.use(authRoutes);

// var uri = 'mongodb://localhost:27017/connexio';
var uri = 'mongodb+srv://reconrez:ConnexioAtlas04@mark04.yriulzz.mongodb.net/';
// connect to MongoDB
mongoose.connect(uri)
  .then(() =>

    console.log('Connected to MongoDB'))
  .catch(err =>
    console.error('Error connecting to MongoDB:', err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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



module.exports = app;