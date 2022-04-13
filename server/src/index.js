import express from 'express'

require("dotenv").config();

import {mongoose} from 'mongoose'
const port = process.env.PORT || 3000

// getting routes
import routes from "./routes/PostRoutes"

//creating express app
const app =express();
app.use(express.json());
app.use("/api", routes);
app.use("/poster", express.static("uploads/blog/images"))

app.use(express.urlencoded({extended:true}))

// Connect to MongoDB database
const dbURI =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>{

        console.log('Db Connected!')
		
    }).catch((error)=>{
        console.log(error)
    })
    
//listening to the request on server
app.listen(port, ()=>{
    console.log('Server started listening')
  
});    



