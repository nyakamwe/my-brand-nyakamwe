import {mongoose} from "mongoose"

const schema = mongoose.Schema({
	title: {
		type:String,
		required:true
	},
	content: {
		type:String,
		required:true
	},
	image:String,
	comment:String,
	likes:Number
	
},{timestamps:true})

const Post = mongoose.model("Post", schema)

export default Post
