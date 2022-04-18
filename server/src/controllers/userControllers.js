// import models
import {User} from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//listing all users
const users_get_all= (req, res)=>{
	
	const users = User.find().then((result)=>{
		return res.status(200).json({data:result})
	})
}

// creating a new user
const user_create = async (req, res)=>{
	try {
		if(req.body.username === '' || req.body.email === '' || req.body.password === ''){
			return res.status(403).json({message:"All fields are required"})
		}

		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(req.body.password, salt)

		const isNewUser = await User.isThisEmailInUSe(req.body.email);
		if(!isNewUser) return res.status(403).json({message:"user already exists"});

		const user = await new User({
			username:req.body.username,
			email:req.body.email,
			password:hashedPassword
		})
	
		await user.save()
	
		return res.status(201).json({message:"user created!"})
		
	} catch (error) {
		return res.status(500).json({error:error.message})
	}

	
}

//login user
const user_get_token= async (req, res)=>{
	try {
		const user = await User.findOne({ username: req.body.username });

		if (user) {
		  const match = await user.passwordComparison(req.body.password, user.password);
		  if (match) {
			//further code to maintain jwt authentication
			
			const user = {
				username : req.body.username
				
			}
			const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
			
			return res.status(200).json({Token:accesToken});
		  } else {
			res.status(403).json({message:"Invalid username or password."});
		  }

		} else {
		  res.status(400).json({message:"Not User."});
		}
        
	  } catch (error) {
		
		res.status(500).json({message:"Internal Server error occured"});
	  }

}

export {users_get_all, user_create, user_get_token}

