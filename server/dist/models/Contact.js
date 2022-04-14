"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var _mongoose = require("mongoose");

const contactSchema = new _mongoose.mongoose.Schema({
  sender: {
    type: String
  },
  name: {
    type: String
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});

const Contact = _mongoose.mongoose.model("Messages", contactSchema);

exports.Contact = Contact;