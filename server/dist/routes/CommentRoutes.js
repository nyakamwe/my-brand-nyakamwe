"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthenticateToken = require("../AuthMiddleWare/AuthenticateToken");

var _commentControllers = require("../controllers/commentControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); //add comment


router.post("/posts/:id/comment", _AuthenticateToken.authenticateToken, _commentControllers.comment_one); // get all comments of a post

router.get("/posts/:id/comments", _commentControllers.comment_get_all); // get one comment

router.get("/comments/:id", _commentControllers.comment_get_one); // delete comment 

router.delete("/comments/:id", _AuthenticateToken.authenticateToken, _commentControllers.comment_delete);
var _default = router;
exports.default = _default;