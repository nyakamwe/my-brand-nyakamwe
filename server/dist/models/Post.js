"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Post = exports.Contact = void 0;

var _mongoose = require("mongoose");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});
const commentSchema = new _mongoose.mongoose.Schema({
  description: String
});
const contactSchema = new _mongoose.mongoose.Schema({
  sender: {
    type: String
  },
  message: {
    type: String
  }
}, {
  timestamps: true
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
  likes: [{
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  postedBy: {
    type: _mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

userSchema.statics.isThisEmailInUSe = async function (email) {
  try {
    const user = await this.findOne({
      email
    });

    if (user) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log('error', error.message);
    return false;
  }
};

userSchema.methods.passwordComparison = function (inputPassword) {
  let user = this;
  return _bcrypt.default.compare(inputPassword, user.password);
};

const User = _mongoose.mongoose.model("User", userSchema);

exports.User = User;

const Post = _mongoose.mongoose.model("Post", schema);

exports.Post = Post;

const Contact = _mongoose.mongoose.model("Messages", contactSchema);

exports.Contact = Contact;