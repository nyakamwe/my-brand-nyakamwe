import express from 'express'
import cors from 'cors'
import morgan from "morgan";
require("dotenv").config();
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from "../swagger.json";
import {mongoose} from 'mongoose'

// getting routes
import routes from "./routes/PostRoutes"
import userroutes from "./routes/UserRoutes"
import contactroutes from "./routes/MessageRoutes"
import commentroutes from "./routes/CommentRoutes"
import likeroutes from "./routes/LikeRoutes"

//creating express app
const app =express();

const port = process.env.PORT || 3000

// allow to pass json into body
app.use(express.json());



//routing routes
app.use("/api", routes);
app.use("/api", userroutes);
app.use("/api", contactroutes);
app.use("/api", commentroutes);
app.use("/api", likeroutes);


//swagger documentation
app.use(morgan("dev"));
app.use("/api/", routes, userroutes, contactroutes, commentroutes, likeroutes);

// set swagger doc as default route
app.use(
	"",
	swaggerUI.serve,
	swaggerUI.setup(swaggerDoc, { explorer: true })
);

// app.use("*", (req, res, next) => {
// 	res.status(404).json({
// 		error: "NOT FOUND",
// 	});
// 	next()
// });


//serve static images
app.use("/poster", express.static("uploads/blog/images"))

app.use(express.urlencoded({extended:true}))

app.use(cors())


// Connect to MongoDB database
const dbURI =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@node-applications.fe4au.mongodb.net/node-tutorial?retryWrites=true&w=majority`
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>{

        console.log('Db Connected!')
		
    }).catch((error)=>{
        console.log(error)
    })
    
//listening to the request on server
export default app.listen(port, ()=>{
    console.log('Server started listening on ' + port)
  
});    