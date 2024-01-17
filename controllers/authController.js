// controllers/auth.js
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("Line8");
    console.log(req.body);
    console.log("Line 9");
    if(req.body){
      const { username, password, email, role } = req.body;
      console.log(`Username: ${username}, Password: ${password}, Email: ${email}, Role: ${role}`);
    }else{
      return  res.status(404).send("Username, password, and email not found.");
    }
    if (!username || !password || !email) {
      console.log(`res ${res}`);
      return res
        .status(400)
        .send("Username, password, and email are required.");
    }
    console.log("Line 18");
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role: role || "user",
    });
    console.log("Line 32");
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    console.log("Retrieved user:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).send("Invalid username or password.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("Password validation:", validPassword);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).send("Invalid username or password.");
    }

    const tokenPayload = { _id: user._id, username: user.username };

    if (user.email) {
      tokenPayload.email = user.email;
    } else {
      console.log("User email not available");
      return res.status(500).send("User email not available.");
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    res.header("Authorization", token).send("Login successful.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user.");
  }
};


module.exports = { register, login };
