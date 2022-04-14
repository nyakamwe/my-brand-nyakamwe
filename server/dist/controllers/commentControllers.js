"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment_one = exports.comment_get_one = exports.comment_get_all = exports.comment_delete = void 0;

var _Post = require("../models/Post");

//comment on a post
const comment_one = async (req, res) => {
  const id = req.params.id;
  const post = await _Post.Post.findById(id);

  if (post !== null) {
    //create comment
    const newComment = await _Post.Comment.create({
      postId: id,
      description: req.body.comment
    });
    post.comments.push(newComment);
    await post.save();
    return res.status(201).json({
      comments: newComment
    });
  } else {
    return res.json({
      message: "Post not available"
    });
  }
}; // get all comments of a post


exports.comment_one = comment_one;

const comment_get_all = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await _Post.Post.findById(postId);
    if (post == null) return res.status(404).json({
      message: "post not found"
    });
    const comments = await _Post.Comment.find({
      postId: postId
    });

    if (comments.length > 0) {
      return res.status(200).json({
        comments,
        post
      });
    } else {
      return res.status(404).json({
        comments: "no comments related to this post"
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
}; // get one comment


exports.comment_get_all = comment_get_all;

const comment_get_one = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await _Post.Comment.findById(commentId);

    if (comment) {
      return res.status(200).json({
        comment
      });
    }

    return res.status(404).json({
      comment: "Comment Doesn't Exists"
    });
  } catch (error) {
    return res.status(404).json({
      comment: "Comment Doesn't Exists"
    });
  }
}; // delete a comment


exports.comment_get_one = comment_get_one;

const comment_delete = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await _Post.Comment.findById(commentId);

    if (comment) {
      // delete a comment
      await _Post.Comment.deleteOne(comment);
      return res.status(200).json({
        message: "Comment deleted"
      });
    }

    return res.status(404).json({
      message: "Comment doesn't exist"
    });
  } catch (error) {
    return res.status(500).json({
      comment: "Internal server error"
    });
  }
};

exports.comment_delete = comment_delete;