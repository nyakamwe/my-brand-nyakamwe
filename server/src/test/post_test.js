import mongoose from 'mongoose';
import chai from 'chai';
import server from "../index";
import chaiHttp from "chai-http";
import {Post} from "../models/Post";
require("dotenv").config();


//to mock a function during testing
import { User } from '../models/User';

let user, autToken, id;

//assertion style
chai.should();

chai.use(chaiHttp)  
    
    
describe('Test for Post Endpoints', ()=>{
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
     * POST a post route
     */

describe("POST /api/posts", ()=>{
    before(()=>{
        mongoose.connection.dropCollection('users')
        mongoose.connection.dropCollection('posts')
    })
   
    

    // create user and login 
    it('creates new user ', (done)=>{

        const newUser = new User({
            username:"menase",
            email:"menase@mail.com",
            password:"password test"
       
        })

        chai.request(server)
        .post("/api/users")
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

    //post creation
    it("creates a new post", (done)=>{
        const userToken = 'Bearer ' + autToken
        
        // const post = new Post({
        //     title: "unit testing",
        //     content: "I am testing nodejs api using mocha with chai assertion library",
        //     poster: "/home/nyakamwe/Pictures/MPAMAVUTA.png"
            
        // })
        
        // post.save()
        
        chai.request(server)
        .post("/api/posts")
    
        //set the auth header with our token
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + autToken)
        .field({
            title: "unit testing",
            content: "I am testing nodejs api using mocha with chai assertion library"
            
        })
        .attach('poster', '/home/nyakamwe/Pictures/MPAMAVUTA.png')
        .end(function(error, response) {
            response.body.should.have.property('id')
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql("Post Saved successfully");

            id = response.body.id;
            
        done();  
        });
    })

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
        

    const userToken = 'Bearer ' + autToken

    it("fails to create a post due to unathorized user", (done)=>{

        const post = new Post({
            title: "keza testing ",
            content: "unit testing with mocha and user keza"
            
        })
        // post.save()
        
        chai.request(server)
        .post("/api/posts")
        .send(post)
        //set the auth header with our token
        .set('Authorization', userToken)
        .end(function(error, response) {
            response.should.have.status(403);
            response.body.should.have.property('message').eql("Invalid Token");
        done();  
        });
       
        
    }) 

    it("do not create a post without title and content", (done)=>{

        const post = new Post({
            title: "",
            content: ""
            
        })
        // post.save()
        
        chai.request(server)
        .post("/api/posts")
    
        //set the auth header with our token
        .set('Authorization', 'Bearer ' + autToken)
        .send(post)
        .end(function(error, response) {
            response.should.have.status(400);
            response.body.should.have.property('message').eql("Title and content are required")
        done();  
        });
    })

        
}) 
    
    
    /**
     * test GET posts route
     */

  describe("GET /api/posts", ()=>{
        
    it("returns all posts", (done)=>{
        chai.request(server)
        .get("/api/posts")
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.message.should.be.eq("Fetched successfully")
        done();
        })
        
    })

    // it("not returns all posts", (done)=>{
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

describe("GET /api/posts/:id", ()=>{
    
    it("returns a single post", (done)=>{
        const postId = id;
        chai.request(server)
        .get(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.message.should.be.eq("successfully fetched")
            
        done();
        })
        
    });

    
    it("not returns a single post at this id", (done)=>{
        const postId = 1234;
        chai.request(server)
        .get(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, responseponse)=>{
            responseponse.should.have.status(404);
            responseponse.body.error.should.be.eq("Post does not exist!")
            
        done();
        })
        
    })
})



    /**
     * PUT a post route
     */

 describe('PUT /api/posts/:id', ()=>{
    it('updates a post', (done)=>{
        
        const postId = id
        const post = {
            title: "unit testing",
            content: "mocha Js framework for testing",
            
        }
        chai.request(server)
        .patch(`/api/posts/${postId}`)
        .send(post)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql("Post successfully updated!")
            
        done();
        })
    })

    it('don\'t updates a post when title or content is empty', (done)=>{
        
        const postId = id
        const post = {
            title: "avicii",
            content: "",
            
        }
        chai.request(server)
        .patch(`/api/posts/${postId}`)
        .send(post)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql("Title and content need value!")
            
        done();
        })
    })


})

    /**
     * DELETE post route
     */

  describe('DELETE /api/posts/:id', ()=>{
      after(()=>{
        mongoose.connection.dropCollection('users') 
        mongoose.connection.dropCollection('posts')
      })
    

    it('It deletes a post', (done)=>{
        const postId = id;
        chai.request(server)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(200);

        done();
        })
    })

    it('It should not delete post that doesn\'t exist in DB', (done)=>{
        const postId = id;
        chai.request(server)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', 'Bearer ' + autToken)
        .end((err, response)=>{
            response.should.have.status(404);
            response.body.should.have.property('error').eql("Post doesn't exist!")
        done();
        })
    })

    

})

})