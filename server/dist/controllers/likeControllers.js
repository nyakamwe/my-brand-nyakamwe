"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post_unlike = exports.post_like = void 0;

var _Post = require("../models/Post");

// like a post
const post_like = async (req, res) => {
  const id = req.body.postId;

  _Post.Post.findByIdAndUpdate(id, {
    $push: {
      likes: {
        postId: id,
        user: req.user.username
      }
    }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        err: err
      });
    } else {
      return res.status(200).json({
        message: "post liked!"
      });
    }
  });
}; //unlike a post


exports.post_like = post_like;

const post_unlike = (req, res) => {
  const id = req.params.id;

  _Post.Post.findByIdAndUpdate(id, {
    $pull: {
      likes: {
        postId: id,
        userId: req.user.id
      }
    }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        err: err
      });
    } else {
      return res.status(200).json({
        message: "unliked post!"
      });
    }
  });
};

exports.post_unlike = post_unlike;