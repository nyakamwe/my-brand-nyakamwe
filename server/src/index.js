import express from 'express'

require("dotenv").config();

import {mongoose} from 'mongoose'
const port = process.env.PORT || 3000

// getting routes
import routes from "./routes/PostRoutes"
import userroutes from "./routes/UserRoutes"
import contactroutes from "./routes/MessageRoutes"
import commentroutes from "./routes/CommentRoutes"
import likeroutes from "./routes/LikeRoutes"

//creating express app
const app =express();

// allow to pass json into body
app.use(express.json());

//routing routes
app.use("/api", routes);
app.use("/api", userroutes);
app.use("/api", contactroutes);
app.use("/api", commentroutes);
app.use("/api", likeroutes);

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



