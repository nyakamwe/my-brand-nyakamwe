"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = exports.Comment = void 0;

var _mongoose = require("mongoose");

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentSchema = new _mongoose.mongoose.Schema({
  postId: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  description: String
}); // const likeSchema = new mongoose.Schema({
// 	userId:{
// 		type:mongoose.Schema.Types.ObjectId,
// 		ref: 'User'
// 	},
// 	postId:{
// 		type:mongoose.Schema.Types.ObjectId,
// 		ref:'Post'
// 	}
// })

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
  likes: [],
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