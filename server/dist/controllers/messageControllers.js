"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages_get_all = exports.message_create = void 0;

var _Contact = require("../models/Contact");

//contact or mesages
const messages_get_all = (req, res) => {
  const messages = _Contact.Contact.find().then(result => {
    return res.status(200).json({
      message: "contacts fetched!"
    });
  }).catch(error => {
    console.log(error);
  });
};

exports.messages_get_all = messages_get_all;

const message_create = async (req, res) => {
  if (req.body.sender === '' || req.body.message === '') {
    return res.status(403).json({
      message: "sender and message are required"
    });
  } else {
    const message = new _Contact.Contact({
      sender: req.body.sender,
      name: req.body.name,
      message: req.body.message
    });
    await message.save();
    return res.status(201).json({
      message: "Message Sent successfully"
    });
  }
};

exports.message_create = message_create;