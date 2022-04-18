"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _Post = require("../models/Post");

var _sinon = _interopRequireDefault(require("sinon"));

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config(); //to mock a function during testing


let user, autToken; //assertion style

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe("Test CRUD of Blog", () => {
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
   * test GET posts route
   */

  describe("GET /api/posts", () => {
    it("returns all posts", done => {
      _chai.default.request(_index.default).get("/api/posts").end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.be.eq("Fetched successfully");
        done();
      });
    });
    it("not returns all posts", done => {
      _chai.default.request(_index.default).get("/api/post").end((err, responseponse) => {
        responseponse.should.have.status(404);
        done();
      });
    });
  });
  /**
   * test GET(by id) post route
   */

  describe("GET /api/posts/:id", () => {
    it("returns a single post", done => {
      const postId = "625943e64e9dd47477f9be96";

      _chai.default.request(_index.default).get(`/api/posts/${postId}`).end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.message.should.be.eq("successfully fetched");
        done();
      });
    });
    it("not returns a single post at this id", done => {
      const postId = "625943e64e9dd47y77f9be96";

      _chai.default.request(_index.default).get(`/api/posts/${postId}`).end((err, responseponse) => {
        responseponse.should.have.status(404);
        responseponse.body.error.should.be.eq("Post does not exist!");
        done();
      });
    });
  });
  /**
   * Test create new user
   */

  describe('POST /api/users', () => {
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
        username: "myuser",
        email: "myuser@mail.com",
        password: "password test"
      });

      _chai.default.request(_index.default).post("/api/users").send(user).end((err, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("user already exists");
        done();
      });
    });
    it('new user with no username, email or password ', done => {
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
    const logInUser = {
      username: 'keza',
      password: 'kayi'
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
        username: 'keza',
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
  /**
   * POST a post route
   */

  describe("POST /api/posts", () => {
    it("creates a new post", done => {
      const userToken = 'Bearer ' + autToken;
      const post = new _Post.Post({
        title: "unit testing",
        content: "I am testing nodejs api using mocha with chai assertion library"
      }); // post.save()

      _chai.default.request(_index.default).post("/api/posts") //set the auth header with our token
      .set('Authorization', 'Bearer ' + autToken).send(post).end(function (error, response) {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Post Saved successfully");
        done();
      });
    });
    const userToken = 'Bearer ' + autToken;
    it("fails to create a post due to unathorized user", done => {
      const post = new _Post.Post({
        title: "keza testing ",
        content: "unit testing with mocha and user keza"
      }); // post.save()

      _chai.default.request(_index.default).post("/api/posts").send(post) //set the auth header with our token
      .set('Authorization', userToken).end(function (error, response) {
        response.should.have.status(403);
        response.body.should.have.property('message').eql("Invalid token");
        done();
      });
    });
    it("do not create a post without title and content", done => {
      const post = new _Post.Post({
        title: "",
        content: ""
      }); // post.save()

      _chai.default.request(_index.default).post("/api/posts") //set the auth header with our token
      .set('Authorization', 'Bearer ' + autToken).send(post).end(function (error, response) {
        response.should.have.status(400);
        response.body.should.have.property('message').eql("Title and content are required");
        done();
      });
    });
  });
  /**
   * PUT a post route
   */

  describe('PUT /api/posts/:id', () => {
    it('updates a post', done => {
      const postId = "625971e678ffabd74eeb9f9c";
      const post = {
        title: "unit testing",
        content: "mocha Js framework for testing"
      };

      _chai.default.request(_index.default).patch(`/api/posts/${postId}`).send(post).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Post successfully updated!");
        done();
      });
    });
    it('don\'t updates a post when title or content is empty', done => {
      const postId = "625af4e9872ff42d49f47dcd";
      const post = {
        title: "avicii",
        content: ""
      };

      _chai.default.request(_index.default).patch(`/api/posts/${postId}`).send(post).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("Title and content need value!");
        done();
      });
    });
  });
  /**
   * DELETE post route
   */

  describe('DELETE /api/posts/:id', () => {
    it('It deletes a post', done => {
      const postId = "62597f8412f8da13b4e0a385";

      _chai.default.request(_index.default).delete(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        done();
      });
    });
    it('It should not delete post that doesn\'t exist in DB', done => {
      const postId = "625b07c93cc2f2b0163f1a75";

      _chai.default.request(_index.default).delete(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('error').eql("Post doesn't exist!");
        done();
      });
    });
  });
  /**
   * GET Contact route
   */

  describe('GET /api/messages', () => {
    it('get all messages', done => {
      _chai.default.request(_index.default).get("/api/messages").end((err, response) => {
        response.should.have.status(200);
        response.body.should.property('message').eql("contacts fetched!");
        done();
      });
    });
    it('don\'t return any message', done => {
      _chai.default.request(_index.default).get("/api/message").end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
  /**
   * POST Contact route
   */

  describe('POST /api/messages', () => {
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
   * GET comment route
  */

  describe('GET /api/posts/:id/comment', () => {
    it('shows all comments related to specific post', done => {
      const postId = "625943e64e9dd47477f9be96";

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
    it('when post have no comment', done => {
      const postId = "62597f9e70efe2a55030c5ab";

      _chai.default.request(_index.default).get(`/api/posts/${postId}/comment`).send({
        postId
      }).end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('comment').eql("no comments related to this post");
        done();
      });
    });
    it('shows individual comment', done => {
      const commentId = "6257f76d68ee5f8c8f964d0b";

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
  * POST comment route
  */

  describe('POST /api/posts/:id/comment', () => {
    it('comment on a post', done => {
      const postId = "625943e64e9dd47477f9be96";
      const newComment = {
        postId,
        description: "testing a comment"
      };

      _chai.default.request(_index.default).post(`/api/posts/${postId}/comment`).send(newComment).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('comment');
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
   * DELETE comment route
   */

  describe('DELETE /api/comments/:id', () => {
    it('deletes comment on a post', done => {
      const commentId = "6257c120c9ebb837fc381ac8";

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
  /**
   * POST like route
   */

  describe('POST /api/posts/like', () => {
    it('likes a post on blog', done => {
      const like = {
        postId: "625c7165aec6ae2c5160b919",
        userId: "625783e613e48cec4a6e5901"
      };

      _chai.default.request(_index.default).put('/api/posts/like').send(like).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql("post liked!");
      });
    });
  });
});