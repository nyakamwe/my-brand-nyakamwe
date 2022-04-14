"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = require("mongoose");

var _PostRoutes = _interopRequireDefault(require("./routes/PostRoutes"));

var _UserRoutes = _interopRequireDefault(require("./routes/UserRoutes"));

var _MessageRoutes = _interopRequireDefault(require("./routes/MessageRoutes"));

var _CommentRoutes = _interopRequireDefault(require("./routes/CommentRoutes"));

var _LikeRoutes = _interopRequireDefault(require("./routes/LikeRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

const port = process.env.PORT || 3000; // getting routes

//creating express app
const app = (0, _express.default)(); // allow to pass json into body

app.use(_express.default.json()); //routing routes

app.use("/api", _PostRoutes.default);
app.use("/api", _UserRoutes.default);
app.use("/api", _MessageRoutes.default);
app.use("/api", _CommentRoutes.default);
app.use("/api", _LikeRoutes.default);
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


app.listen(port, () => {
  console.log('Server started listening');
});