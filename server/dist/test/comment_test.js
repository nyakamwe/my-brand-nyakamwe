"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chai = _interopRequireWildcard(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _Post = require("../models/Post");

var _fs = _interopRequireDefault(require("fs"));

var _User = require("../models/User");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

let user, autToken, id, cId; //assertion style

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Test for Comment Endpoints', () => {
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
  * POST comment route
  */

  describe('POST /api/posts/:id/comment', () => {
    before(() => {
      _mongoose.default.connection.dropCollection('users');

      _mongoose.default.connection.dropCollection('comments');
    }); // create user and login 

    it('creates new user ', done => {
      const newUser = new _User.User({
        username: "menase",
        email: "menase@mail.com",
        password: "password test"
      });

      _chai.default.request(_index.default).post("/api/users/register").send(newUser).end((err, response) => {
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
    }); //post creation

    it("creates a new post", done => {
      const userToken = 'Bearer ' + autToken;

      _chai.default.request(_index.default).post("/api/posts") //set the auth header with our token
      .set('Content-Type', 'multipart/form-data').set('Authorization', 'Bearer ' + autToken).field({
        title: "unit testing",
        content: "I am testing nodejs api using mocha with chai assertion library"
      }).attach('poster', _fs.default.readFileSync('/home/nyakamwe/Pictures/MPAMAVUTA.png'), 'images/MPAMAVUTA.jpg').end(function (error, response) {
        response.body.should.have.property('id');
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Post Saved successfully");
        id = response.body.id;
        done();
      });
    });
    it('comment on a post', done => {
      const postId = id;
      const newComment = new _Post.Comment({
        postId,
        description: "testing a comment"
      });
      newComment.save();

      _chai.default.request(_index.default).post(`/api/posts/${postId}/comment`).send(newComment).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('comment');
        cId = newComment.id;
        done();
      });
    });
    it('handles when you want to comment on non existing post', done => {
      const postId = "62597f8412f8da13b4e0a385";
      const newComment = {
        postId,
        description: "testing a comment"
      };

      _chai.default.request(_index.default).post(`/api/posts/${postId}/comment`).send(newComment).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Post not available");
        done();
      });
    });
  });
  /**
   * GET comment route
  */

  describe('GET /api/posts/:id/comment', () => {
    it('shows all comments related to specific post', done => {
      const postId = id;

      _chai.default.request(_index.default).get(`/api/posts/${postId}/comment`).send({
        postId
      }).end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.a('object');
        done();
      });
    });
    it('show error when that post in not in DB', done => {
      const postId = "625b07c93cc2f2b0163f1a75";

      _chai.default.request(_index.default).get(`/api/posts/${postId}/comment`).send({
        postId
      }).end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('message').eql("post not found");
        done();
      });
    });
    it('shows individual comment', done => {
      const commentId = cId;

      _chai.default.request(_index.default).get(`/api/comments/${commentId}`).send({
        commentId
      }).end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('comment');
        done();
      });
    });
    it('shows error for non existing comment', done => {
      const commentId = "625943e64e9dd47477f9be96";

      _chai.default.request(_index.default).get(`/api/comments/${commentId}`).send({
        commentId
      }).end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('comment').eql("Comment Doesn't Exists");
        done();
      });
    });
  });
  /**
   * DELETE comment route
   */

  describe('DELETE /api/comments/:id', () => {
    it('deletes comment on a post', done => {
      const commentId = cId;

      _chai.default.request(_index.default).delete(`/api/comments/${commentId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        done();
      });
    });
    it('handles when you want to delete non existing comment', done => {
      const commentId = "625943e64e9dd47477f9be96";

      _chai.default.request(_index.default).delete(`/api/comments/${commentId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('message').eql("Comment doesn't exist");
        done();
      });
    });
  });
});