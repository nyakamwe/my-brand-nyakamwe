import {Post,Comment} from '../models/Post'


//comment on a post
const comment_one = async (req, res)=>{
	const id = req.params.id;
	const post = await Post.findById(id);

	if (post !== null){
		//create comment
		const newComment = await Comment.create({
			postId:id,
			description: req.body.comment
		});

		post.comments.push(newComment);
		await post.save()
		return res.status(201).json({comment:newComment})
		
	}else{
		return res.status(404).json({message:"Post not available"})
	}
}

// get all comments of a post
const comment_get_all = async (req, res)=>{
	try {
		const postId= req.params.id;
		const post = await Post.findById(postId);
		if(post == null) return res.status(404).json({message:"post not found"});
		
		const comments = await Comment.find({postId:postId});

		if(comments.length > 0){
            
			return res.status(200).json({comments});
		}else{
			return res.status(404).json({comment:"no comments related to this post"});
		}
	
	} catch (error) {
		return res.status(404).json({message:error.message})
	}
	
}

// get one comment
const comment_get_one = async (req, res)=>{
	
	try {
		const commentId = req.params.id;
		const comment = await Comment.findById(commentId)
		if(comment != null ){
			return res.status(200).json({comment})
		}

		return res.status(404).json({comment:"Comment Doesn't Exists"})

	} catch (error) {
		return res.status(404).json({comment:"Comment Doesn't Exists"})
	}
	

}

// delete a comment
const comment_delete = async (req, res)=>{
	
	try {
		const commentId = req.params.id;
		const comment = await Comment.findById(commentId)
		if(comment != null ){

			// delete a comment
			await Comment.deleteOne(comment)

			return res.status(200).json({message:"Comment deleted"})
			
		}
		
		return res.status(404).json({message:"Comment doesn't exist"})
		

	} catch (error) {
		return res.status(500).json({comment:"Internal server error"})
	}
	

}

export {comment_one,comment_get_all,comment_get_one,comment_delete}