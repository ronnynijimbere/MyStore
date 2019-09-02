const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');


const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });


//this will called the users controller, We will get the users email and password
router.route('/signup')
	.post(validateBody(schemas.authSchema), UsersController.signUp);

//this will be delegated to the passportjs, we will generate a token
router.route('/signin')
	.post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
	.post(passportGoogle, UsersController.googleOAuth);

router.route('/oauth/facebook')
	.post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);	

router.route('/secret')
	.get(passportJWT, UsersController.secret);


module.exports = router;
