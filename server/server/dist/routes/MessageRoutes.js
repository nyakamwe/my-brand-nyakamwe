"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthenticateToken = require("../AuthMiddleWare/AuthenticateToken");

var _messageControllers = require("../controllers/messageControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//Contact or Messages
router.get("/messages", _AuthenticateToken.authenticateToken, _messageControllers.messages_get_all);
router.get("/messages/:messageId", _AuthenticateToken.authenticateToken, _messageControllers.message_get_one);
router.post("/messages", _messageControllers.message_create);
router.delete("/messages/:messageId", _AuthenticateToken.authenticateToken, _messageControllers.message_delete_one);
var _default = router;
exports.default = _default;