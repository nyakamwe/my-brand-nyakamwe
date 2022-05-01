"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _likeControllers = require("../controllers/likeControllers");

var _AuthenticateToken = require("../AuthMiddleWare/AuthenticateToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//like a post
router.put("/posts/:id/like", _AuthenticateToken.authenticateToken, _likeControllers.post_like); //unlike a post
// router.put("/posts/:id/unlike", authenticateToken, post_unlike)

var _default = router;
exports.default = _default;