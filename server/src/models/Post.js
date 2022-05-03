import {mongoose} from "mongoose"


const commentSchema = new mongoose.Schema({
	postId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Post'
	},
    description:String
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
	poster: {
		type:String,
		required:true
	},

	comments:[commentSchema],

	likes:[],

	postedBy: {
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}

},{timestamps:true})


export const Comment = mongoose.model("Comment", commentSchema)
export const Post = mongoose.model("Post", schema)

