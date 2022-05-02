"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages_get_all = exports.message_get_one = exports.message_delete_one = exports.message_create = void 0;

var _Contact = require("../models/Contact");

//contact or mesages
const messages_get_all = async (req, res) => {
  try {
    const messages = await _Contact.Contact.find();
    if (messages == null) return res.status(404);
    return res.status(200).json({
      data: messages,
      message: "contacts fetched!"
    });
  } catch (error) {
    return res.status(404);
  }
}; // get single message


exports.messages_get_all = messages_get_all;

const message_get_one = async (req, res) => {
  try {
    const message = await _Contact.Contact.findById(req.params.messageId);
    if (!message) return res.status(404).json({
      message: "Contact not available"
    });
    return res.status(200).json({
      data: message
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
}; // delete a message


exports.message_get_one = message_get_one;

const message_delete_one = async (req, res) => {
  try {
    const message = await _Contact.Contact.findById(req.params.messageId);
    if (!message) return res.status(404).json({
      message: "Contact not available"
    });
    await message.remove();
    return res.status(200).json({
      message: "Message Deleted!"
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
}; // sending a message


exports.message_delete_one = message_delete_one;

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