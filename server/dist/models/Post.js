"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const schema = _mongoose.mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  comment: String,
  likes: Number
}, {
  timestamps: true
});

const Post = _mongoose.mongoose.model("Post", schema);

var _default = Post;
exports.default = _default;