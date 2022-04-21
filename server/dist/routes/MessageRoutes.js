"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messageControllers = require("../controllers/messageControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//Contact or Messages
router.get("/messages", _messageControllers.messages_get_all);
router.post("/messages", _messageControllers.message_create);
var _default = router;
exports.default = _default;