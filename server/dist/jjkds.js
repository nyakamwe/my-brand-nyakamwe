"use strict";

var should = require('should');

var _ = require('lodash');

var async = require('async');

var app = require('../../../../app');

var request = require('supertest');

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Firm = mongoose.model('Firm');
var firm, user, userPassword, createdFirm, loggedInUser;
describe('GET /api/firms', function () {
  beforeEach(function (done) {
    firm = new Firm({
      company: 'My test company',
      corporateMail: 'test.com'
    });
    userPassword = 'password';
    user = new User({
      fistname: 'Fake User',
      lastname: 'Fake User',
      email: 'test@test.com',
      job: 'Partner',
      firmName: firm.company,
      password: userPassword,
      isActivated: true,
      _firmId: firm._id
    });

    function createFirm(cb) {
      request(app).post('/api/firms').send(firm).expect(201).end(function (err, res) {
        if (err) throw err;
        createdFirm = res.body;
        cb();
      });
    }

    function createUser(cb) {
      request(app).post('/api/common/users').send(user).expect(200).end(function (err, res) {
        createdUser = res.body;
        if (err) throw err;
        cb();
      });
    }

    ;
    async.series([function (cb) {
      createFirm(cb);
    }, function (cb) {
      createUser(cb);
    }], done);
  });
  afterEach(function (done) {
    firm.remove();
    user.remove();
    done();
  });
  it('should respond with 401 error', function (done) {
    request(app).get('/api/firms').expect(401).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
  it('should login', function (done) {
    request(app).post('/auth/local').send({
      email: user.email,
      password: user.password
    }).expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
  it('should respond with 200 after login', function (done) {
    request(app).get('/api/firms').expect(200).end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });
}); /////////////////

beforeEach(function (done) {
  // create user
  user = new User({
    username: "test",
    email: "test.gmail.com",
    password: "password test"
  }); // user.save()

  chai.request(server).post("/api/users").end((err, response) => {
    createdUser = response.body.Token;
    response.should.have.status(201);
    done();
  });
  console.log(createdUser);
});
/**
     * test POST a post route
     */

describe("POST /api/posts", () => {
  const authtoken = 'Bearer ' + createdUser;
  it("creates a new post", done => {
    const post = new Post({
      title: "I am testing ",
      content: "unit testing with mocha",
      image: "https://media.istockphoto.com/photos/slender-mongoose-forage-and-look-for-food-among-rocks-picture-id894586246?k=20&m=894586246&s=612x612&w=0&h=PkDlx6gm2uJFGtS_Ts10dx33Vm0vM4CQ2swBran-w28="
    }); // post.save()

    chai.request(server).post("/api/posts").set('Content-Type', 'application/json').set('Accept', 'application/json').set('Authorization', authtoken).end((err, response) => {
      response.should.have.status(201);
      done();
    });
  });
}); /////////////

chai.request(server).get('/todos').end(function (err, res) {
  chai.request(server).delete('/todo/' + res.body[0]._id) // we set the auth header with our token
  .set('Authorization', 'JWT ' + token).end(function (error, resonse) {
    resonse.should.have.status(200);
    resonse.body.should.have.property('message');
    resonse.body.message.should.equal('Authorized User, Action Successful!');
    done();
  });
}); ///////

chai.request(server).post("/api/posts").set('Authorization', `Bearer ${autToken}`).send(post).end((err, response) => {
  response.should.have.status(201);
  response.body.should.be.a('object');
  response.body.should.have.property('message');
  response.body.should.have.property('message').eql("Post Saved successfully");
  done();
}); /////////////

const post = new Post({
  title: req.body.title,
  content: req.body.content,
  image: req.file.filename
}); /////////

if (req.body.content) {
  post.content = req.body.content;
  post.comment = req.body.comment, post.likes = req.body.likes;
} ///


imageUrl: `http://localhost:${process.env.PORT}}/poster/${req.file.filename}`; ///
//625943e64e9dd47477f9be96