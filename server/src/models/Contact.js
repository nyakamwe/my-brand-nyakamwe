import {mongoose} from "mongoose"

const contactSchema = new mongoose.Schema({
	sender:{
		type:String
	},
    name:{
        type:String
    },
	message:{
		type:String
	}
},{timestamps:true})


export const Contact = mongoose.model("Message", contactSchema)