"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = exports.Comment = void 0;

var _mongoose = require("mongoose");

const commentSchema = new _mongoose.mongoose.Schema({
  postId: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  description: String
});
const likeSchema = new _mongoose.mongoose.Schema({
  postId: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  userId: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
const schema = new _mongoose.mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  comments: [commentSchema],
  likes: [likeSchema],
  postedBy: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Comment = _mongoose.mongoose.model("Comment", commentSchema);

exports.Comment = Comment;

const Post = _mongoose.mongoose.model("Post", schema);

exports.Post = Post;