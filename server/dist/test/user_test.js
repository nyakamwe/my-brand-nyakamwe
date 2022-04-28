// import mongoose from 'mongoose';
// import chai from 'chai';
// import server from "../index";
// import chaiHttp from "chai-http";
// import {Post} from "../models/Post";
// require("dotenv").config();
// //to mock a function during testing
// import { User } from '../models/User';
// let user, autToken;
// //assertion style
// chai.should();
// chai.use(chaiHttp)  
// describe('Test for User Endpoints', ()=>{
//     before(function(done) {
//         // Connect to MongoDB database
//     const dbURI =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`
//     mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true}).then((responseult)=>{
//             console.log('Db Connected!')
//             done();
//         }).catch((error)=>{
//             console.log(error)
//         })
//     });
//     /**
//      * Test create new user
//      */
//      describe('POST /api/users', ()=>{
//         before(()=>{
//             mongoose.connection.dropCollection("users");
//         })
//         it('creates new user ', (done)=>{
//             const newUser = new User({
//                 username:"menase",
//                 email:"menase@mail.com",
//                 password:"password test"
//             })
//             chai.request(server)
//             .post("/api/users")
//             .send(newUser)
//             .end((err, response)=>{
//                 response.should.have.status(201);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eql("user created!");
//             done();   
//             })
//         })
//         it('User exists', (done)=>{
//             user = new User({
//                 username:"menase",
//                 email:"menase@mail.com",
//                 password:"password test"
//             })
//             chai.request(server)
//             .post("/api/users")
//             .send(user)
//             .end((err, response)=>{
//                 response.should.have.status(403);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eql("user already exists");
//             done();   
//             })
//         })
//         it('No new user without username, email or password ', (done)=>{
//             const user = new User({
//                 username:"",
//                 email:"",
//                 password:""
//             })
//             chai.request(server)
//             .post("/api/users")
//             .send(user)
//             .end((err, response)=>{
//                 response.should.have.status(403);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eql("All fields are required");
//             done();   
//             })
//         })
//     })
//     /**
//      * POST User login
//      */
//      describe('POST /api/users/login', ()=>{
//          after(()=>{
//              mongoose.connection.dropCollection('users')
//          })
//         const logInUser = {
//             username:'menase',
//             password:'password test'
//         }
//         it('login a user', (done)=>{
//             chai.request(server)
//             .post('/api/users/login')
//             .send({username:logInUser.username, password:logInUser.password})
//             .end(function(err, response) {
//                 if (err) return done(err);
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
//                 autToken = response.body.Token
//                 done();
//             });
//         })
//         it('not login a user with incorrect credentials', (done)=>{
//             const logInUser = {
//                 username:'menase',
//                 password:'password'
//             }
//             chai.request(server)
//             .post('/api/users/login')
//             .send({username:logInUser.username, password:logInUser.password})
//             .end(function(err, response) {
//                 if (err) return done(err);
//                 response.should.have.status(403);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eql("Invalid username or password.");
//             done();   
//             });
//         })
//         it('not login anonymous user', (done)=>{
//             const logInUser = {
//                 username:'hereweare',
//                 password:'hereweare'
//             }
//             chai.request(server)
//             .post('/api/users/login')
//             .send({username:logInUser.username, password:logInUser.password})
//             .end(function(err, response) {
//                 if (err) return done(err);
//                 response.should.have.status(400);
//                 response.body.should.have.property('message').eql("Not User.");
//             done();   
//             });
//         })
//     })
// })    
"use strict";