"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = authenticateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({
    message: 'Token is required'
  });

  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({
      message: "Invalid token"
    });
    req.user = user;
    next();
  });
}