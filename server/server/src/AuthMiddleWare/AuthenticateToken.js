import jwt from 'jsonwebtoken'


export function authenticateToken(req, res, next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
		// console.log(error.message)
	
		if(error) return res.status(403).json({message:"Invalid Token"})

		req.user = user;
		
		next();
	})
}
