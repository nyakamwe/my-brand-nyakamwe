import {mongoose} from "mongoose"

const commentSchema = new mongoose.Schema({
	postId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Post'
	},
    description:String
})

const likeSchema = new mongoose.Schema({
	postId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Post'
	},
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
    
})




const schema = new mongoose.Schema({
	title: {
		type:String,
		required:true
	},
	content: {
		type:String,
		required:true
	},
	image:String,

	comments:[commentSchema],

	likes:[likeSchema],

	postedBy:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}

},{timestamps:true})


export const Comment = mongoose.model("Comment", commentSchema)
export const Post = mongoose.model("Post", schema)

