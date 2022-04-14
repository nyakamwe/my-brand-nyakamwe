"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
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

const User = _mongoose.default.model("User", userSchema);

exports.User = User;