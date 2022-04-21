// import mongoose from 'mongoose';
// import chai from 'chai';
// import server from "../index";
// import chaiHttp from "chai-http";
// import {Post} from "../models/Post";
// require("dotenv").config();
// //to mock a function during testing
// import sinon from 'sinon'
// import { User } from '../models/User';
// let user, autToken;
// //assertion style
// chai.should();
// chai.use(chaiHttp)
// describe("Test CRUD of Blog", ()=>{
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
//      * POST like route
//      */
//      describe('POST /api/posts/like', ()=>{
//         it('likes a post on blog', (done)=>{
//             const like={
//                 postId:"625c7165aec6ae2c5160b919",
//                 userId:"625783e613e48cec4a6e5901"
//             }
//             chai.request(server)
//             .put('/api/posts/like')
//             .send(like)
//             .set('Authorization', 'Bearer ' + autToken)
//             .end((err, response)=>{
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('message').eql("post liked!")
//             })
//         })
//     })
// })
"use strict";