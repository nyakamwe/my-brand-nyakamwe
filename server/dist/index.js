"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _mongoose = require("mongoose");

var _PostRoutes = _interopRequireDefault(require("./routes/PostRoutes"));

var _UserRoutes = _interopRequireDefault(require("./routes/UserRoutes"));

var _MessageRoutes = _interopRequireDefault(require("./routes/MessageRoutes"));

var _CommentRoutes = _interopRequireDefault(require("./routes/CommentRoutes"));

var _LikeRoutes = _interopRequireDefault(require("./routes/LikeRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

//creating express app
const app = (0, _express.default)();
app.use((0, _cors.default)());
const port = process.env.PORT || 3000; // allow to pass json into body

app.use(_express.default.json()); //routing routes

app.use("/api", _PostRoutes.default);
app.use("/api", _UserRoutes.default);
app.use("/api", _MessageRoutes.default);
app.use("/api", _CommentRoutes.default);
app.use("/api", _LikeRoutes.default); //swagger documentation

app.use((0, _morgan.default)("dev"));
app.use("/api/", _PostRoutes.default, _UserRoutes.default, _MessageRoutes.default, _CommentRoutes.default, _LikeRoutes.default); // set swagger doc as default route

app.use("", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default, {
  explorer: true
})); // app.use("*", (req, res, next) => {
// 	res.status(404).json({
// 		error: "NOT FOUND",
// 	});
// 	next()
// });
//serve static images

app.use("/poster", _express.default.static("uploads/blog/images"));
app.use(_express.default.urlencoded({
  extended: true
})); // Connect to MongoDB database

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`;

_mongoose.mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(result => {
  console.log('Db Connected!');
}).catch(error => {
  console.log(error);
}); //listening to the request on server


var _default = app.listen(port, () => {
  console.log('Server started listening on ' + port);
});

exports.default = _default;