// controllers/auth.js
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require('../models/Blacklist');

const register = async (req, res) => {
  try {

    if (req.body) {
      console.log(req.body);
    } else {
      return res.status(404).json({
        message: "Username, password, and email not found."
      });
    }

    const {
      username,
      password,
      email,
      role
    } = req.body;
    console.log(`Username: ${username}, Password: ${password}, Email: ${email}, Role: ${role}`);

    if (!username || !password || !email) {
      console.log(`res ${res}`);
      return res
        .status(400)
        .json({
          message: "Username, password, and email are required."
        })
    }

    const existingUser = await User.findOne({
      username
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error registering user."
    });
  }
};


const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      username: req.body.username
    });
    console.log("Retrieved user:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({
        message: "Invalid username or password."
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("Password validation:", validPassword);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).json({
        message: "Invalid username or password."
      });
    }

    const tokenPayload = {
      _id: user._id,
      username: user.username
    };
    console.log("Token payload:", tokenPayload);
    if (user.email) {
      tokenPayload.email = user.email;
    } else {
      console.log("User email not available");
      return res.status(500).json({
        message: "User email not available."
      });
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    res.header("Authorization", token).json({
      message: "Login successful.",
      data:[
        {
          token,
          user
        }
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error logging in user."
    });
  }
};

const logout = async(req, res) => {
  try {
    const authHeader = req.headers['cookie']; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(';')[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).json({ message: 'You are logged out!' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
}


module.exports = { register, login, logout };
