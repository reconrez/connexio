// controllers/auth.js
const Token = require("../models/tokenSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const getAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP_TIME,
  });
}

const getRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXP_TIME,
  });
}

const verifyRefreshToken = async (refresh_token) => {
  try {
    const payload = jwt.decode(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    if (!payload) {
      return { status: false, result: "Invalid Token" };
    }

    const response = await Token.findOne({ user_id: payload.user_id });
    if (!response) {
      return { status: false, result: "Invalid Token" };
    }

    return jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err) => {
      if (err) {
        return {
          status: false,
          result: "Refresh Token got expired, Login again to get new pair of token",
        };
      } else {
        return { status: true, result: "Access Granted" };
      }
    });
  } catch (err) {
    return { status: false, result: err.message };
  }
}

const verifyAccessToken = async (access_token) => {
  try {
    return jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err && err.message == "invalid signature") {
        return { status: false, result: "Invalid Access Token" };
      } else {
        const payload = jwt.decode(access_token, process.env.ACCESS_TOKEN_SECRET);
        return { status: true, result: { access_token: access_token, email: payload.email } };
      }
    });
  } catch (err) {
    return { status: false, result: err.message };
  }
}

const getNewAccessToken = async ({ refresh_token }) => {
  try {
    const response = await verifyRefreshToken(refresh_token);

    if (!response.status) return response;

    const payload = jwt.decode(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const new_access_token = getAccessToken({ user_id: payload.user_id, email: payload.email });

    return { status: true, result: { access_token: new_access_token } };
  } catch (err) {
    return err;
  }
}

const register = async ({
  username,
  email,
  password,
  repassword
}) => {
  const emailRegExp = /\S+@\S+\.\S+/;

  if (!username) {
    return {
      status: false,
      result: "Username is required"
    };
  }

  if (!emailRegExp.test(email)) {
    return {
      status: false,
      result: "Invalid Email"
    };
  }

  if (!password) {
    return {
      status: false,
      result: "Password is required"
    };
  }

  if (password !== repassword) {
    return {
      status: false,
      result: "Password mismatch"
    };
  }

  const hash = await bcrypt.hash(password, 10);
  const uuid = uuidv4();

  try {
    let user = new User({
      user_id: uuid,
      username: username,
      email: email,
      password: hash,
      role: 'user',
    });

    await user.save();

    const payload = {
      user_id: uuid,
      email
    };
    const access_token = getAccessToken(payload);
    const refresh_token = getRefreshToken(payload);

    return {
      status: true,
      result: {
        username : user.username,
        email : user.email,
        user_id: user.user_id,
        profilePicture : "assets/img/default-avatar.png",
        role : user.role,
        access_token,
        refresh_token
      }
    };
  } catch (err) {
    return {
      status: false,
      result: "Username or Email already taken"
    };
  }
}

const login = async ({
  username,
  password
}) => {

  try {
    const user = await User.findOne({
      username
    });

    if (!user) {
      return {
        status: false,
        result: "Invalid Username"
      };
    }
    const user_id = user.user_id;
    const email = user.email;
    const profilePicture = user.profilePicture;
    const role = user.role;
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return {
        status: false,
        result: "Invalid Password"
      };
    }

    const payload = {
      user_id,
      email
    };
    const access_token = getAccessToken(payload);
    const refresh_token = getRefreshToken(payload);
    const token = new Token({
      refresh_token,
      user_id
    });


    await token.save();
    
    return { status: true, result: { user_id, username, profilePicture, role, access_token, refresh_token } };
  } catch (err) {
    return { status: false, result: err.message };
  }
}

const logout = async ({ access_token }) => {
  try {    
    const token = await Token.findOneAndDelete({ access_token });

    if (token === null) {
      return { status: false, result: "Invalid User ID" };
    } else {
      return { status: true, result: "Logout Successful" };
    }
  } catch (err) {
    return { status: false, result: err.message };
  }
}

module.exports = { register, login, logout, getNewAccessToken };
