import mongoose from "mongoose"
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

userSchema.statics.getUser = function (username) {
	return this.find({ username: username });
}

export const User =mongoose.model("User", userSchema)