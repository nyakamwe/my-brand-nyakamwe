"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = require("mongoose");

var _PostRoutes = _interopRequireDefault(require("./routes/PostRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

const port = process.env.PORT || 3000; // getting routes

//creating express app
const app = (0, _express.default)();
app.use(_express.default.json());
app.use("/api", _PostRoutes.default);
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