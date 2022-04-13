import {mongoose} from "mongoose"
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	email:{
		type: String
	},
	password:{
		type: String,
		required: true
	}

})

const commentSchema = new mongoose.Schema({
    description:String
})

const contactSchema = new mongoose.Schema({
	sender:{
		type:String
	},
	message:{
		type:String
	}
},{timestamps:true})


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

	likes:[
		{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
		}
	],

	postedBy:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}

},{timestamps:true})



userSchema.statics.isThisEmailInUSe = async function(email){
	try {
		const user = await this.findOne({email})
		if(user) {
			return false;
		}else{
			return true;
		}
		
		
	} catch (error) {
		console.log('error', error.message);
		return false;
		
	}

	
}

userSchema.methods.passwordComparison = function(inputPassword){
let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

export const User =mongoose.model("User", userSchema)
export const Post = mongoose.model("Post", schema)
export const Contact = mongoose.model("Messages", contactSchema)

