// import models
import {Post,Contact,User} from '../models/Post'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const post_get_all = async (req, res) => {
	const posts = await Post.find().sort({createdAt: -1})
	return res.json({data:posts, status:200, message:"Fetched successfully"})
}

const post_create = async (req, res) => {
	if(req.body.title === '' || req.body.content === ''){
		return res.status(203).json({message:"Title and content are required"})
	}
	else{
		const post = new Post({
			title: req.body.title,
			content: req.body.content,
			image:req.file.filename,
	
		})
		await post.save()

		return res.status(201).json({data:post, status:201, message:"Post Saved successfully", 
									imageUrl:`http://localhost:${process.env.PORT}/poster/${req.file.filename}`})
	}
	
}


const post_get_one = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if(post === null){
			return res.status(204).json({message:"Post of that id is not available"});
		}

		return res.status(200).json({data:post, message:"successfully fetched"});

	} catch {
		return res.status(404).json({error: "Post doesn't exist!"})
	}
}

const post_update = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
			post.comment=req.body.comment,
			post.likes=req.body.likes
		}
		

		await post.save()
		return res.status(200).json({data:post, message:"Post successfully updated!", 
									imageUrl:`http://localhost:${process.env.PORT}}/poster/${req.file.filename}`});
		
	} catch {
		return res.status(404).json({error: "Post doesn't exist!"})
	}
}

const post_delete = async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })

		return res.status(204).json({Message: "Post deleted successfully!"})
	} catch {
		return res.status(404).json({error: "Post doesn't exist!"})
	}
}

const comment_one = async (req, res)=>{
	const id = req.params.id
	const post = Post.findById(id).then((record)=>{
		if (post !== null){
			record.comments.push({description:req.body.comment})
			record.save()
			return res.status(201).json({message:"comment successfull"})
			
		}else{
			return res.json({message:"Post not available"})
		}
	
	}).catch(error=>{
		console.log(error)
	})
	
}

//contact or mesages
const messages_get_all = (req, res)=>{
const messages = Contact.find().then((result)=>{
	return res.status(200).json({data:result, messages:"contacts fetched!"})
}).catch(error =>{
	console.log(error)
})
}

const message_create = async(req, res)=>{
	if(req.body.sender === '' || req.body.message === ''){
		return res.status(403).json({message:"sender and message are required"})
	}
	else{
		const message = new Contact({
			sender: req.body.sender,
			message: req.body.message,
	
		})
		await message.save()

		return res.status(201).json({data:message, message:"Message Sent successfully"})
	}
}

function authenticateToken(req, res, next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

	jwt.verify(token, process.env.ACESS_TOKEN, (error, user)=>{
		if(error) return res.status(403).json({message:"Invalid token"})

		req.user=user

		next()
	})
}

const post_like = (req, res)=>{
	const id = req.body.postId
	Post.findByIdAndUpdate(id,{
		$push:{likes:req.user._id}},{
			new:true
		}).exec((err, result)=>{
			if(err){
				return res.status(422).json({err:err})
			}
			else{
				return res.status(200).json({message:"post liked!"})
			}
		})
	// Post.findByIdAndUpdate(id).then((record)=>{

	// 	console.log(record)
	// })
}

const post_unlike = (req, res)=>{
	const id = req.params.id
	Post.findByIdAndUpdate(id,{
		$pull:{likes:req.user._id}},{
			new:true
		}).exec((err, result)=>{
			if(err){
				return res.status(422).json({err:err})
			}
			else{
				return res.status(200).json({result})
			}
		})
}

//listing all users
const users_get_all= (req, res)=>{
	const users = User.find().then((result)=>{
		return res.status(200).json({data:result})
	})
}

// creating a new user
const user_create = async (req, res)=>{
	try {
		if(req.body.username === '' || req.body.email === '' || req.body.password === ''){
			return res.status(403).json({message:"All fields are required"})
		}

		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(req.body.password, salt)

		const isNewUser = await User.isThisEmailInUSe(req.body.email);
		if(!isNewUser) return res.status(403).json({message:"user already exists"});

		const user = await new User({
			username:req.body.username,
			email:req.body.email,
			password:hashedPassword
		})
	
		await user.save()
	
		return res.status(201).json({data:user, message:"user created!"})
		
	} catch (error) {
		return res.status(500).json({error:error.message})
	}

	
}

//login user
const user_get_token= async (req, res)=>{
	try {
		const user = await User.findOne({ username: req.body.username });

		if (user) {
		  const match = await user.passwordComparison(req.body.password, user.password);
		  if (match) {
			//   ..... further code to maintain authentication like jwt or sessions
			res.status(200).json({message:"Auth Successful"});
		  } else {
			res.status(403).json({message:"Invalid username or password."});
		  }
		} else {
		  res.status(400).json({message:"Not User."});
		}
	  } catch (error) {
		
		res.status(500).json({message:"Internal Server error Occured"});
	  }



}


export {post_get_all, post_create, post_get_one, post_update, post_delete, comment_one, 
		messages_get_all, message_create, authenticateToken, post_like,post_unlike, users_get_all,user_create, user_get_token}
