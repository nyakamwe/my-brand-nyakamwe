// import models
import {Post} from '../models/Post'



// get all posts
const post_get_all = async (req, res) => {
	const posts = await Post.find().sort({createdAt: -1})
	return res.json({data:posts, status:200, message:"Fetched successfully"})
}

// create new post
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

// get individual post
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

// update a post
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

// delete a post
const post_delete = async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })

		return res.status(204).json({Message: "Post deleted successfully!"})
	} catch {
		return res.status(404).json({error: "Post doesn't exist!"})
	}
}



export {post_get_all, post_create, post_get_one, post_update, post_delete}
