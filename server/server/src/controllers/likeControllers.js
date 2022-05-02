import { Post } from "../models/Post"


// like a post
const post_like = async (req, res)=>{
	const post = await Post.findByIdAndUpdate(req.params.id)
	if(post){
		const likes = post.likes

		const exist = post.likes.filter(like=>{
			if(like.postId === req.params.id && like.user === req.user.username){
				return like
			}
			
		})

		if(exist.length === 1){
			
			// if already liked it turns to unlike
			exist.forEach(ex=>{
				const idx = post.likes.indexOf(ex)
				post.likes.splice(idx, 1)
				post.save()
				return res.status(200).json({message:"post unliked!"})
			})
		
		}
		else{
		
		post.likes.push({postId:req.params.id, user:req.user.username})
		post.save()

		return res.status(200).json({message:"post liked!"})
		
		}

	}
}

//like a post
// const post_like = async (req, res)=>{
// 	const id = req.params.id

// 	Post.findByIdAndUpdate(id,{
		
// 		$push:{likes:{postId:id, user:req.user.username}}},{
// 			new:true
// 		}).exec((err, result)=>{
// 			if(err){
// 				return res.status(422).json({err:err})
// 			}
// 			else{
				
// 				return res.status(200).json({message:"post liked!"})
// 			}
// 		})
// }


//unlike a post
// const post_unlike = (req, res)=>{
// 	const id = req.params.id
// 	Post.findByIdAndUpdate(id,{
// 		$pull:{likes:{postId:id, userId:req.user.username}}},{
// 			new:true
// 		}).exec((err, result)=>{
// 			if(err){
// 				return res.status(422).json({err:err})
// 			}
// 			else{
// 				return res.status(200).json({message:"unliked post!"})
// 			}
// 		})
// }


export {post_like}
