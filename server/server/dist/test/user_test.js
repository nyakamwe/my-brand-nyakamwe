"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _Post = require("../models/Post");

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config(); //to mock a function during testing


let user, autToken; //assertion style

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Test for User Endpoints', () => {
  before(function (done) {
    // Connect to MongoDB database
    const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`;

    _mongoose.default.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(responseult => {
      console.log('Db Connected!');
      done();
    }).catch(error => {
      console.log(error);
    });
  });
  /**
   * Test create new user
   */

  describe('POST /api/users', () => {
    before(() => {
      _mongoose.default.connection.dropCollection("users");
    });
    it('creates new user ', done => {
      const newUser = new _User.User({
        username: "menase",
        email: "menase@mail.com",
        password: "password test"
      });

      _chai.default.request(_index.default).post("/api/users").send(newUser).end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("user created!");
        done();
      });
    });
    it('User exists', done => {
      user = new _User.User({
        username: "menase",
        email: "menase@mail.com",
        password: "password test"
      });

      _chai.default.request(_index.default).post("/api/users").send(user).end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("user already exists");
        done();
      });
    });
    it('No new user without username, email or password ', done => {
      const user = new _User.User({
        username: "",
        email: "",
        password: ""
      });

      _chai.default.request(_index.default).post("/api/users").send(user).end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("All fields are required");
        done();
      });
    });
  });
  /**
   * POST User login
   */

  describe('POST /api/users/login', () => {
    after(() => {
      _mongoose.default.connection.dropCollection('users');
    });
    const logInUser = {
      username: 'menase',
      password: 'password test'
    };
    it('login a user', done => {
      _chai.default.request(_index.default).post('/api/users/login').send({
        username: logInUser.username,
        password: logInUser.password
      }).end(function (err, response) {
        if (err) return done(err);
        response.should.have.status(200);
        response.body.should.be.a('object');
        autToken = response.body.Token;
        done();
      });
    });
    it('not login a user with incorrect credentials', done => {
      const logInUser = {
        username: 'menase',
        password: 'password'
      };

      _chai.default.request(_index.default).post('/api/users/login').send({
        username: logInUser.username,
        password: logInUser.password
      }).end(function (err, response) {
        if (err) return done(err);
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Invalid username or password.");
        done();
      });
    });
    it('not login anonymous user', done => {
      const logInUser = {
        username: 'hereweare',
        password: 'hereweare'
      };

      _chai.default.request(_index.default).post('/api/users/login').send({
        username: logInUser.username,
        password: logInUser.password
      }).end(function (err, response) {
        if (err) return done(err);
        response.should.have.status(400);
        response.body.should.have.property('message').eql("Not User.");
        done();
      });
    });
  });
});