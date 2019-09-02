const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require("passport-facebook-token");
const config = require('./config');
const User = require('./models/user');

//JWT is only interest in were the token is contained and the secret
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.JWT_SECRET
}, async(payload, done) => {
	try {
	//find the user specified in token: payload is called when we want token data
	const user = await User.findById(payload.sub);
	
	//if user doesnt exist, handle it
	if (!user) {
		return done(null, false);
	}
	
	//otherwise, return user
	done(null, user);
	} catch(error) {
		done(error, false);
	}
}));

//Google Oauth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
   clientID: config.oauth.google.clientID,
   clientSecret: config.oauth.google.clientSecret 	
}, async(accessToken, refreshToken, profile, done) => {
	try {
		console.log('accessToken', accessToken);
   		console.log('refreshToken', refreshToken);
   		console.log('profile', profile);	

   		//check if current user already exists in our database
   		const existingUser = await User.findOne({"google.id": profile.id});
   		if (existingUser) {
   		 return done(null, existingUser);
   		}

   		//if new account/user
  		 const newUser = new User({
   		 method: 'google',
   		 google: {
   			id: profile.id,
   			email: profile.emails[0].value
   		}
        });

   		await newUser.save();
   		done(null, newUser);
	}   catch(error) {
		done(null, false, error.message);
	}
}));

//Facebook Strategy

passport.use('facebookToken', new FacebookTokenStrategy({
	clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async(accessToken, refreshToken, profile, done) => {
	try {
	  console.log('accessToken', accessToken);
	  console.log('refreshToken', refreshToken);
	  console.log('profile', profile);
	 
	 	const existingUser = await User.findOne({"facebook.id": profile.id});
   		if (existingUser) {
   		 return done(null, existingUser);
   		}

   		//if new account/user
  		 const newUser = new User({
   		 method: 'facebook',
   		 facebook: {
   			id: profile.id,
   			email: profile.emails[0].value
   		}
        });

   		await newUser.save();
   		done(null, newUser);
	}   catch(error) {
	    done(error, false, error.message);		
	}
}));
 
//Local Strategy
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try {
	//find if the user has given the email
	const user = await User.findOne({ "local.email": email });

	//if not, handle
	if (!user) {
		return done(null, false);
	}

	//check if the password is correct
	const isMatch = await user.isValidPassword(password);
	
	//if not, handle
	if (isMatch) {
		return done(null, false);
	}

	//otherwise, return the user
	done(null, user);	

	} catch(error) {
	  done(error, false);	
	}
}));