import { Post } from "../models/Post"


// like a post
const post_like = async (req, res)=>{
	const id = req.body.postId
	

	Post.findByIdAndUpdate(id,{
		$push:{likes:{postId:id, user:req.user.username}}},{
			new:true
		}).exec((err, result)=>{
			if(err){
				return res.status(422).json({err:err})
			}
			else{
				
				return res.status(200).json({message:"post liked!"})
			}
		})
}

//unlike a post
const post_unlike = (req, res)=>{
	const id = req.params.id
	Post.findByIdAndUpdate(id,{
		$pull:{likes:{postId:id, userId:req.user.id}}},{
			new:true
		}).exec((err, result)=>{
			if(err){
				return res.status(422).json({err:err})
			}
			else{
				return res.status(200).json({message:"unliked post!"})
			}
		})
}


export {post_like, post_unlike,}
