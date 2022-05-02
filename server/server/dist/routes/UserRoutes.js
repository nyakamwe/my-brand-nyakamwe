"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthenticateToken = require("../AuthMiddleWare/AuthenticateToken");

var _userControllers = require("../controllers/userControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); //users//


router.get("/users", _AuthenticateToken.authenticateToken, _userControllers.users_get_all);
router.post("/users/register", _userControllers.user_create); //login user

router.post("/users/login", _userControllers.user_get_token);
var _default = router;
exports.default = _default;