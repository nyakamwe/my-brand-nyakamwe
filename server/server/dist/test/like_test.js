"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _Post = require("../models/Post");

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

let user, autToken, id, cId; //assertion style

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Test for Like Endpoints', () => {
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

  describe('POST /api/posts/like', () => {
    before(() => {
      _mongoose.default.connection.dropCollection('users');
    }); // create user and login 

    it('creates new user ', done => {
      const newUser = new _User.User({
        username: "menase",
        email: "menase@mail.com",
        password: "password test"
      });
      console.log(newUser.get(id));

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
    console.log(logInUser.id);
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
    it("creates a new post", done => {
      after(() => {
        _mongoose.default.connection.dropCollection('users');
      });
      const userToken = 'Bearer ' + autToken;
      const post = new _Post.Post({
        title: "unit testing",
        content: "I am testing nodejs api using mocha with chai assertion library"
      });
      post.save();

      _chai.default.request(_index.default).post("/api/posts") //set the auth header with our token
      .set('Authorization', 'Bearer ' + autToken).send(post).end(function (error, response) {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Post Saved successfully");
        id = post.id;
        done();
      });
    }); // it('likes a post', (done)=>{
    //     const like = {
    //         "postId":""
    //     }
    //     chai.request(server)
    //     .post("/api/posts/like")
    //     .send(message)
    //     .end((err, response)=>{
    //         response.should.have.status(201);
    //         response.body.should.property('message').eql("Message Sent successfully")
    //     done();
    //     })
    // })
  });
});