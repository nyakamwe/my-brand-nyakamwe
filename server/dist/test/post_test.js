"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _Post = require("../models/Post");

var _fs = _interopRequireDefault(require("fs"));

var _User = require("../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

let user, autToken, id; //assertion style

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Test for Post Endpoints', () => {
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
   * POST a post route
   */

  describe("POST /api/posts", () => {
    before(() => {
      _mongoose.default.connection.dropCollection('users');

      _mongoose.default.connection.dropCollection('posts');
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

    it("creates a new post", async () => {
      const userToken = 'Bearer ' + autToken;
      const res = await _chai.default.request(_index.default).post("/api/posts").set('Content-Type', 'multipart/form-data').set('Authorization', 'Bearer ' + autToken).field({
        title: "unit testing",
        content: "I am testing nodejs api using mocha with chai assertion library"
      }).attach('poster', _fs.default.readFileSync(`${__dirname}/MPAMAVUTA.png`), 'MPAMAVUTA.png');
      res.body.should.have.property('id');
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("Post Saved successfully");
      id = res.body.id;
    }); // it("creates a new post", (done)=>{
    //     const userToken = 'Bearer ' + autToken
    //     chai.request(server)
    //     .post("/api/posts")
    //     //set the auth header with our token
    //     .set('Content-Type', 'multipart/form-data')
    //     .set('Authorization', 'Bearer ' + autToken)
    //     .field({
    //         title: "unit testing",
    //         content: "I am testing nodejs api using mocha with chai assertion library"
    //     })
    //     .attach('poster', fs.readFileSync('/home/nyakamwe/Pictures/MPAMAVUTA.png'), 'images/MPAMAVUTA.png')
    //     .end(function(error, response) {
    //         response.body.should.have.property('id')
    //         response.should.have.status(201);
    //         response.body.should.be.a('object');
    //         response.body.should.have.property('message').eql("Post Saved successfully");
    //         id = response.body.id;
    //     done();  
    //     });
    // })
    // it("creates a new post", (done)=>{
    //     const userToken = 'Bearer ' + autToken
    //     const post = new Post({
    //         title: "unit testing",
    //         content: "I am testing nodejs api using mocha with chai assertion library"
    //     })
    //     post.save()
    //     chai.request(server)
    //     .post("/api/posts")
    //     //set the auth header with our token
    //     .set('Content-Type', 'multipart/form-data')
    //     .set('Authorization', 'Bearer ' + autToken)
    //     .field({
    //         title: "unit testing",
    //         content: "I am testing nodejs api using mocha with chai assertion library"
    //     })
    //     .attach('poster', '/home/nyakamwe/Pictures/MPAMAVUTA.png')
    //     .end(function(error, response) {
    //         response.should.have.status(201);
    //         response.body.should.be.a('object');
    //         response.body.should.have.property('message').eql("Post Saved successfully");
    //         id = post.id;
    //     done();  
    //     });
    // })
    // it("creates a new post", (done)=>{
    //     const userToken = 'Bearer ' + autToken
    //     const post = new Post({
    //         title: "unit testing",
    //         content: "I am testing nodejs api using mocha with chai assertion library"
    //     })
    //     post.save()
    //     chai.request(server)
    //     .post("/api/posts")
    //     //set the auth header with our token
    //     .set('Authorization', 'Bearer ' + autToken)
    //     .send(post)
    //     .end(function(error, response) {
    //         response.should.have.status(201);
    //         response.body.should.be.a('object');
    //         response.body.should.have.property('message').eql("Post Saved successfully");
    //         id= post.id
    //     done();  
    //     });
    // })

    const userToken = 'Bearer ' + autToken;
    it("fails to create a post due to unathorized user", done => {
      const post = new _Post.Post({
        title: "keza testing ",
        content: "unit testing with mocha and user keza"
      }); // post.save()

      _chai.default.request(_index.default).post("/api/posts").send(post) //set the auth header with our token
      .set('Authorization', userToken).end(function (error, response) {
        response.should.have.status(403);
        response.body.should.have.property('message').eql("Invalid Token");
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
   * test GET posts route
   */

  describe("GET /api/posts", () => {
    it("returns all posts", done => {
      _chai.default.request(_index.default).get("/api/posts").set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        response.body.message.should.be.eq("Fetched successfully");
        done();
      });
    }); // it("not returns all posts", (done)=>{
    //     chai.request(server)
    //     .get("/api/post")
    //     .end((err, response)=>{
    //         response.should.have.status(404);
    //     done();
    //     })
    // })
  });
  /**
   * test GET(by id) post route
   */

  describe("GET /api/posts/:id", () => {
    it("returns a single post", done => {
      const postId = id;

      _chai.default.request(_index.default).get(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.message.should.be.eq("successfully fetched");
        done();
      });
    });
    it("not returns a single post at this id", done => {
      const postId = 1234;

      _chai.default.request(_index.default).get(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, responseponse) => {
        responseponse.should.have.status(404);
        responseponse.body.error.should.be.eq("Post does not exist!");
        done();
      });
    });
  });
  /**
   * PUT a post route
   */

  describe('PUT /api/posts/:id', () => {
    it('updates a post', done => {
      const postId = id;
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
  });
  /**
   * DELETE post route
   */

  describe('DELETE /api/posts/:id', () => {
    after(() => {
      _mongoose.default.connection.dropCollection('users');

      _mongoose.default.connection.dropCollection('posts');
    });
    it('It deletes a post', done => {
      const postId = id;

      _chai.default.request(_index.default).delete(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(200);
        done();
      });
    });
    it('It should not delete post that doesn\'t exist in DB', done => {
      const postId = id;

      _chai.default.request(_index.default).delete(`/api/posts/${postId}`).set('Authorization', 'Bearer ' + autToken).end((err, response) => {
        response.should.have.status(404);
        response.body.should.have.property('error').eql("Post doesn't exist!");
        done();
      });
    });
  });
});