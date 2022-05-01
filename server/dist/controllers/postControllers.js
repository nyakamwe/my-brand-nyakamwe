"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post_update = exports.post_get_one = exports.post_get_all = exports.post_delete = exports.post_create = void 0;

var _Post = require("../models/Post");

var _cloudinaryImage = _interopRequireDefault(require("../helpers/cloudinaryImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import models
// get all posts
const post_get_all = async (req, res) => {
  const posts = await _Post.Post.find().sort({
    createdAt: -1
  });
  return res.json({
    posts,
    status: 200,
    message: "Fetched successfully"
  });
}; // create new post


exports.post_get_all = post_get_all;

const post_create = async (req, res) => {
  try {
    if (req.body.title === '' || req.body.content === '') {
      return res.status(400).json({
        message: "Title and content are required"
      });
    } else {
      // generating link from cloudinary
      const cloud_save = await _cloudinaryImage.default.uploader.upload(req.file.path, {
        with: 500,
        height: 500,
        crop: 'fill'
      });
      const setPoster = cloud_save ? cloud_save.url : ' '; // new post

      const post = new _Post.Post({
        title: req.body.title,
        content: req.body.content,
        poster: setPoster
      });
      await post.save();
      return res.status(201).json({
        id: post.id,
        status: 201,
        message: "Post Saved successfully",
        success: 1,
        posterUrl: `${cloud_save.url}`
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: error.message
    });
  }
}; // get individual post


exports.post_create = post_create;

const post_get_one = async (req, res) => {
  try {
    const post = await _Post.Post.findOne({
      _id: req.params.id
    });

    if (post === null) {
      return res.status(404).json({
        message: "Post of that id is not available"
      });
    }

    return res.status(200).json({
      post,
      message: "successfully fetched"
    });
  } catch {
    return res.status(404).json({
      error: "Post does not exist!"
    });
  }
}; // update a post


exports.post_get_one = post_get_one;

const post_update = async (req, res) => {
  try {
    const post = await _Post.Post.findOne({
      _id: req.params.id
    });

    if (req.body.title.length > 0 && req.body.content.length > 0) {
      post.title = req.body.title, post.content = req.body.content;
      await post.save();
      return res.status(200).json({
        message: "Post successfully updated!"
      });
    } else {
      return res.status(400).json({
        message: "Title and content need value!"
      });
    }
  } catch {
    return res.status(404).json({
      error: "Post doesn't exist!"
    });
  }
}; // delete a post


exports.post_update = post_update;

const post_delete = async (req, res) => {
  try {
    const post = await _Post.Post.findById(req.params.id);

    if (post != null) {
      await post.remove();
      return res.status(200).json({
        message: "Post deleted successfully!"
      });
    } else {
      return res.status(404).json({
        error: "Post doesn't exist!"
      });
    }
  } catch {
    return res.status(500).json({
      error: "Server error"
    });
  }
};

exports.post_delete = post_delete;