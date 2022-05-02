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

describe('Test for Message Endpoints', () => {
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
  * POST Contact route
  */

  describe('POST /api/messages', () => {
    before(() => {
      _mongoose.default.connection.dropCollection('messages');

      _mongoose.default.connection.dropCollection('users');
    }); // create user and login 

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
    }); // login

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
    it('Send messages', done => {
      const message = {
        sender: 'test@mail.com',
        name: "Eric gasana",
        message: "I would like to thank you for those valuable posts"
      };

      _chai.default.request(_index.default).post("/api/messages").send(message).end((err, response) => {
        response.should.have.status(201);
        response.body.should.property('message').eql("Message Sent successfully");
        done();
      });
    });
    it('dont send a message when sender, message content is not provided', done => {
      const message = {
        sender: '',
        name: "sawa",
        message: ""
      };

      _chai.default.request(_index.default).post("/api/messages").send(message).end((err, response) => {
        response.should.have.status(403);
        response.body.should.property('message').eql("sender and message are required");
        done();
      });
    });
  });
  /**
   * GET Contact route
   */

  describe('GET /api/messages', () => {
    after(() => {
      _mongoose.default.connection.dropCollection('messages');

      _mongoose.default.connection.dropCollection('users');
    });
    it('get all messages', done => {
      _chai.default.request(_index.default).get("/api/messages").set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        response.body.should.property('message').eql("contacts fetched!");
        done();
      });
    }); // it('don\'t return any message', (done)=>{
    //     chai.request(server)
    //     .get("/api/message")
    //     .end((err, response)=>{
    //         response.should.have.status(404);
    //     done();
    //     })
    // })
  });
});