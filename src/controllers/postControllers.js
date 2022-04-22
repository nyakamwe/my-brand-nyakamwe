// import models
import {Post} from '../models/Post'



// get all posts
const post_get_all = async (req, res) => {
	const posts = await Post.find().sort({createdAt: -1})
	return res.json({data:posts, status:200, message:"Fetched successfully"})
}

// create new post
const post_create = async (req, res) => {
	try {
		if(req.body.title === '' || req.body.content === ''){
			return res.status(400).json({message:"Title and content are required"})
		}
		else{
			const post = new Post({
				title: req.body.title,
				content: req.body.content
				
		
			})
			await post.save()
	
			return res.status(201).json({status:201, message:"Post Saved successfully"})
		}
	} catch (error) {
		return res.status(403).json({message:"Invalid token"})
	}
	
	
}

// get individual post
const post_get_one = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if(post === null){
			return res.status(404).json({message:"Post of that id is not available"});
		}

		return res.status(200).json({data:post, message:"successfully fetched"});

	} catch {
		return res.status(404).json({error: "Post does not exist!"})
	}
}

// update a post
const post_update = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title.length > 0 && req.body.content.length > 0) {
			post.title = req.body.title,
			post.content = req.body.content


			await post.save()
			return res.status(200).json({message:"Post successfully updated!"});
		}
		else{
			return res.status(400).json({message:"Title and content need value!"});
		}

	} catch {
		return res.status(404).json({error: "Post doesn't exist!"})
	}
}

// delete a post
const post_delete = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if(post != null){

			await post.remove();
			return res.status(200).json({message: "Post deleted successfully!"})
		}
		else{
			return res.status(404).json({error: "Post doesn't exist!"})
		}

		
	} catch {
		return res.status(500).json({error: "Server error"})
	}
}



export {post_get_all, post_create, post_get_one, post_update, post_delete}
