"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post_update = exports.post_get_one = exports.post_get_all = exports.post_delete = exports.post_create = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Post model
const post_get_all = async (req, res) => {
  const posts = await _Post.default.find().sort({
    createdAt: -1
  });
  return res.json({
    data: posts,
    status: 200,
    message: "Fetched successfully"
  });
};

exports.post_get_all = post_get_all;

const post_create = async (req, res) => {
  if (req.body.title === '' || req.body.content === '') {
    return res.status(203).json({
      message: "Title and content are required"
    });
  } else {
    const post = new _Post.default({
      title: req.body.title,
      content: req.body.content,
      image: req.file.filename,
      comment: req.body.comment,
      likes: req.body.likes
    });
    await post.save();
    return res.status(201).json({
      data: post,
      status: 201,
      message: "Post Saved successfully",
      imageUrl: `http://localhost:${process.env.PORT}/poster/${req.file.filename}`
    });
  }
};

exports.post_create = post_create;

const post_get_one = async (req, res) => {
  try {
    const post = await _Post.default.findOne({
      _id: req.params.id
    });
    return res.status(200).json({
      data: post,
      message: "successfully fetched"
    });
  } catch {
    return res.status(404).json({
      error: "Post doesn't exist!"
    });
  }
};

exports.post_get_one = post_get_one;

const post_update = async (req, res) => {
  try {
    const post = await _Post.default.findOne({
      _id: req.params.id
    });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
      post.comment = req.body.comment, post.likes = req.body.likes;
    }

    await post.save();
    return res.status(200).json({
      data: post,
      message: "Post successfully updated!",
      imageUrl: `http://localhost:${process.env.PORT}}/poster/${req.file.filename}`
    });
  } catch {
    return res.status(404).json({
      error: "Post doesn't exist!"
    });
  }
};

exports.post_update = post_update;

const post_delete = async (req, res) => {
  try {
    await _Post.default.deleteOne({
      _id: req.params.id
    });
    return res.status(204).json({
      Message: "Post deleted successfully!"
    });
  } catch {
    return res.status(404).json({
      error: "Post doesn't exist!"
    });
  }
};

exports.post_delete = post_delete;