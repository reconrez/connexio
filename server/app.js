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
const multer = require('multer');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const forumRoutes = require("./routes/forumRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
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
const upload = multer({ storage: multer.diskStorage({ destination: './uploads' }), limits: { fileSize: 1000000 } });
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './dist/')));


app.use("/auth", authRoutes);
app.use("/api", postRoutes);
app.use("/api", forumRoutes);
app.use("/api", userRoutes);
app.use("/api", attachmentRoutes);

// catch 404 and forward to error handler
app.all(/.*/, (req, res) => {
  res.statusCode = 404;
  res.send("Page not Found");
});

console.log(uuidv4());
const morgan = require('morgan');
app.use(morgan('dev'));
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