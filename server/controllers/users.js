const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

signToken = user => {
return JWT.sign({
			iss:"HyperionDev",
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
		}, JWT_SECRET);
	}

module.exports = {
	signUp: async (req, res, next) => {
		const { email, password } = req.value.body;
		
		//check if there is a user with same email
		const foundUser = await User.findOne({ "local.email": email });
		if (foundUser) {
			return res.status(403).json({ error: 'email already in use'});
		}
		
		//create new user
		const newUser = new User({
			method: 'local',
			local: {
				email: email,
				password: password
			} 
		});
		await newUser.save();

		//Generate token
		const token = signToken(newUser);
		

		//Respond with token
		res.status(200).json({ token });
	},

	signIn: async (req, res, next) => {
		//generate token
		const token = signToken(req.user);
		res.status(200).json({ token });
	},	
	
	googleOAuth: async (req, res, next) => {
		//generate token
		const token = signToken(req.user);
		res.status(200).json({ token });
	},

	facebookOAuth: async (req, res, next) => {
		//generate token
		const token = signToken(req.user);
		res.status(200).json({ token });
	},	

	secret: async (req, res, next) => {
		console.log('Thank you for visiting');
		res.json({ secret: "Welcome Home" });
	}
}