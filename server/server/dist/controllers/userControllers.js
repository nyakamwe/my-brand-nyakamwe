"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users_get_all = exports.user_get_token = exports.user_create = void 0;

var _User = require("../models/User");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import models
//listing all users
const users_get_all = (req, res) => {
  const users = _User.User.find().then(result => {
    return res.status(200).json({
      users: result
    });
  });
}; // creating a new user


exports.users_get_all = users_get_all;

const user_create = async (req, res) => {
  try {
    if (req.body.username === '' || req.body.email === '' || req.body.password === '') {
      return res.status(403).json({
        message: "All fields are required"
      });
    }

    const salt = await _bcrypt.default.genSalt();
    const hashedPassword = await _bcrypt.default.hash(req.body.password, salt);
    const isNewUser = await _User.User.isThisEmailInUSe(req.body.email);
    if (!isNewUser) return res.status(403).json({
      message: "user already exists"
    });
    const user = await new _User.User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    return res.status(201).json({
      message: "user created!"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}; //login user


exports.user_create = user_create;

const user_get_token = async (req, res) => {
  try {
    const user = await _User.User.findOne({
      username: req.body.username
    });

    if (user) {
      const match = await user.passwordComparison(req.body.password, user.password);

      if (match) {
        //further code to maintain jwt authentication
        const user = {
          username: req.body.username
        };

        const accesToken = _jsonwebtoken.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30m'
        });

        return res.status(200).json({
          Token: accesToken
        });
      } else {
        res.status(403).json({
          message: "Invalid username or password."
        });
      }
    } else {
      res.status(400).json({
        message: "Not User."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error occured"
    });
  }
};

exports.user_get_token = user_get_token;