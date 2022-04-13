"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _uploadConfig = _interopRequireDefault(require("../uploadConfig"));

var _postControllers = require("../controllers/postControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

// Get all posts
router.get("/posts", _postControllers.post_get_all); // create post

router.post("/posts", _uploadConfig.default.single('poster'), _postControllers.post_create); // getting individual post

router.get("/posts/:id", _postControllers.post_get_one); // updating post

router.patch("/posts/:id", _uploadConfig.default.single('poster'), _postControllers.post_update); // delete post

router.delete("/posts/:id", _postControllers.post_delete); //comment

router.post("/posts/:id/comment", _postControllers.authenticateToken, _postControllers.comment_one); //Contact or Messages

router.get("/messages/", _postControllers.messages_get_all);
router.post("/messages/", _postControllers.message_create); //like a post

router.put("/posts/like", _postControllers.authenticateToken, _postControllers.post_like); //unlike a post

router.put("/posts/:id/unlike", _postControllers.authenticateToken, _postControllers.post_unlike); //users//

router.get("/users", _postControllers.users_get_all);
router.post("/users", _postControllers.user_create); //login user

router.post("/users/login", _postControllers.user_get_token);
var _default = router;
exports.default = _default;