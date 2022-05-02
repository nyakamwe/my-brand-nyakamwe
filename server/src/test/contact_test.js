import mongoose from 'mongoose';
import chai from 'chai';
import server from "../index";
import chaiHttp from "chai-http";
import {Post} from "../models/Post";
require("dotenv").config();


//to mock a function during testing
import { User } from '../models/User';

let user, autToken;

//assertion style
chai.should();

chai.use(chaiHttp)  
    
    
describe('Test for Message Endpoints', ()=>{
    before(function(done) {
        // Connect to MongoDB database
    const dbURI =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`
    mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true}).then((responseult)=>{

            console.log('Db Connected!')

            done();
            
        }).catch((error)=>{
            console.log(error)
        })


    });     
    

    /**
 * POST Contact route
 */

describe('POST /api/messages', ()=>{
    before(()=>{
        mongoose.connection.dropCollection('messages')
        mongoose.connection.dropCollection('users')
    })
    
    // create user and login 
    it('creates new user ', (done)=>{

        const newUser = new User({
            username:"menase",
            email:"menase@mail.com",
            password:"password test"
       
        })

        chai.request(server)
        .post("/api/users/register")
        .send(newUser)
        .end((err, response)=>{
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql("user created!");
        done();   
        })
    })

    // login
    const logInUser = {
        username:'menase',
        password:'password test'
    }

    it('login a user', (done)=>{
        chai.request(server)
        .post('/api/users/login')
        .send({username:logInUser.username, password:logInUser.password})
        .end(function(err, response) {
            if (err) return done(err);

            response.should.have.status(200);
            response.body.should.be.a('object');
            autToken = response.body.Token
            
            done();
        });

    })

    it('Send messages', (done)=>{
        const message = {
            sender: 'test@mail.com',
            name:"Eric gasana",
            message: "I would like to thank you for those valuable posts",
    
        }
        chai.request(server)
        .post("/api/messages")
        .send(message)
        .end((err, response)=>{
            response.should.have.status(201);
            response.body.should.property('message').eql("Message Sent successfully")
        done();
        })
    })

    it('dont send a message when sender, message content is not provided', (done)=>{
        const message = {
            sender: '',
            name:"sawa",
            message: "",
    
        }
        chai.request(server)
        .post("/api/messages")
        .send(message)
        .end((err, response)=>{
            response.should.have.status(403);
            response.body.should.property('message').eql("sender and message are required")
        done();
        })
    
    })
})

    /**
     * GET Contact route
     */

 describe('GET /api/messages', ()=>{
    after(()=>{
        mongoose.connection.dropCollection('messages')
        mongoose.connection.dropCollection('users')
    })
    it('get all messages', (done)=>{
        chai.request(server)
        .get("/api/messages")
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(200);
            
            response.body.should.property('message').eql("contacts fetched!")
        done();
        })
    })

    // it('don\'t return any message', (done)=>{
    //     chai.request(server)
    //     .get("/api/message")
    //     .end((err, response)=>{
    //         response.should.have.status(404);
    //     done();
    //     })
    // })
})


})