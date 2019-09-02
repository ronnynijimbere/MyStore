import axios from 'axios';
import { 
	AUTH_SIGN_UP, 
	AUTH_ERROR, 
	AUTH_SIGN_OUT, 
	AUTH_SIGN_IN, 
	DASHBOARD_GET_DATA } from './types';
/*
 The process as follows
actionCreators -> create/return actions ({ }) -> dispatched -> middlewares -> reducers
*/

export const oauthGoogle = data => {
	return async dispatch => {
		const res = await axios.post('http://localhost:5000/users/oauth/google', {
			access_token: data
		})
		dispatch({
			type: AUTH_SIGN_UP,
			payload: res.data.token
		})

		localStorage.setItem('JWT_TOKEN', res.data.token);
		axios.defaults.headers.common['Authorization'] = res.data.token;
	};
}

export const oauthFacebook = data => {
	return async dispatch => {
		const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
			access_token: data
		})
		dispatch({
			type: AUTH_SIGN_UP,
			payload: res.data.token
		});

		localStorage.setItem('JWT_TOKEN', res.data.token);
		axios.defaults.headers.common['Authorization'] = res.data.token;
	};
}

//takes form data
export const signUp = data => {
	/*
		  Step1: Use the data to make HTTP requests to our Backend and send it along (3rd party
		  library axios)
		  Step2: take the backend response (jwtToken is here now)
		  Step3: dispatched msg user signed up (with jwtToken)
		  Step4: save the jwtToken into our localStorage
	*/ 
	return async dispatch => {
		try {
		  /*Step1: Use the data to make HTTP requests to our Backend and send it along (3rd party
		  library axios)
		  Step2: take the backend response (jwtToken is here now)*/	
		  console.log('[actionCreator] signUp called')
		  const res = await axios.post('http://localhost:5000/users/signup', data);	
		  

		  // Step3: dispatched msg user signed up (with jwtToken)
		  console.log('[actionCreator] signUp dispatch an action!')
		  dispatch({
		  	type: AUTH_SIGN_UP,
		  	payload: 'res.data.token'
		  });

		  //Step4: save the jwtToken into our localStorage
		  localStorage.setItem('JWT_TOKEN', res.data.token);
		  axios.defaults.headers.common['Authorization'] = res.data.token;
		} catch(err) {
			dispatch({
			 type: AUTH_ERROR,
			 payload:"Email already in use"	
			});
		}	
	};
}

//takes form data
export const signIn = data => {
	/*
		  Step1: Use the data to make HTTP requests to our Backend and send it along (3rd party
		  library axios)
		  Step2: take the backend response (jwtToken is here now)
		  Step3: dispatched msg user signed up (with jwtToken)
		  Step4: save the jwtToken into our localStorage
	*/ 
	return async dispatch => {
		try {
		  /*Step1: Use the data to make HTTP requests to our Backend and send it along (3rd party
		  library axios)
		  Step2: take the backend response (jwtToken is here now)*/	
		  console.log('[actionCreator] signIn called')
		  const res = await axios.post('http://localhost:5000/users/signin', data);	
		  

		  // Step3: dispatched msg user signed up (with jwtToken)
		  console.log('[actionCreator] signIn dispatch an action!')
		  dispatch({
		  	type: AUTH_SIGN_IN,
		  	payload: 'res.data.token'
		  });

		  //Step4: save the jwtToken into our localStorage
		  localStorage.setItem('JWT_TOKEN', res.data.token);
		  axios.defaults.headers.common['Authorization'] = res.data.token;
		} catch(err) {
			dispatch({
			 type: AUTH_ERROR,
			 payload:"Email and password combination are not valid"	
			});
		}	
	};
}

export const getSecret = () => {
	return async dispatch => {
		try {
			console.log('[actionCreator] trying to get Backend Secret')
			const res = await axios.get('http://localhost:5000/users/secret')
			console.log('res', res)

			dispatch({
				type: DASHBOARD_GET_DATA,
				payload: res.data.secret
			}) 
		} catch (err) {
			console.error('err', err)
		}	
	}
}

//to sign out user and remove jwt token from the browser
export const signOut = () => {
	return dispatch => {
		localStorage.removeItem('JWT_TOKEN');
		axios.defaults.headers.common['Authorization'] = ''; //removes the secret when user signOut

		dispatch({
			type: AUTH_SIGN_OUT,
			payload: ''
		});
	};
}