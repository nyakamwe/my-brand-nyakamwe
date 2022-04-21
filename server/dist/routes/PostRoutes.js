"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _uploadConfig = _interopRequireDefault(require("../uploadConfig"));

var _AuthenticateToken = require("../AuthMiddleWare/AuthenticateToken");

var _postControllers = require("../controllers/postControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

// Get all posts
router.get("/posts", _postControllers.post_get_all); // create post

router.post("/posts", _uploadConfig.default.single('poster'), _AuthenticateToken.authenticateToken, _postControllers.post_create); // getting individual post

router.get("/posts/:id", _postControllers.post_get_one); // updating post

router.patch("/posts/:id", _uploadConfig.default.single('poster'), _AuthenticateToken.authenticateToken, _postControllers.post_update); // delete post

router.delete("/posts/:id", _postControllers.post_delete);
var _default = router;
exports.default = _default;