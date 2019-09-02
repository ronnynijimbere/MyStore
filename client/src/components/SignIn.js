import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';
import CustomInput from './CustomInput';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';

 //users will be redirected to the Homepage once authenticated
 class SignIn extends Component {
 	constructor(props) {
 		super(props);
 			this.onSubmit = this.onSubmit.bind(this);
 			this.responseGoogle= this.responseGoogle.bind(this);
 			this.responseFacebook= this.responseFacebook.bind(this);
 	}

 	//user redirected to homepage when signin with normal sign in
 	async onSubmit(formData) {
 		//we need to call some action : actionCreator
 		await this.props.signIn(formData);
 		if (!this.props.errorMessage) {
 			this.props.history.push('/');
 		}
 	}

 	//user redirected to homepage when signin with google
 	async responseGoogle(res) {
 		await this.props.oauthGoogle(res.accessToken);
 		if (!this.props.errorMessage) {
 			this.props.history.push('/');
 		}

 	}

 	//user redirected to homepage when signup with facebook
 	async responseFacebook(res) {
 		await this.props.oauthFacebook(res.accessToken);
 		if (!this.props.errorMessage) {
 			this.props.history.push('/');
 		}
 	}

	render() {
		const { handleSubmit } = this.props
		return (
			<div className="row">
			 <div className="col">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<fieldset>
					 	<Field
					 		name="email"
					 		type="text"
					 		id="email"
					 		label="Enter your email"
					 		placeholder="example@example.com"
					 		component={ CustomInput } />
					</fieldset>
					<fieldset>
					 	<Field
					 		name="password"
					 		type="password"
					 		id="password"
					 		label="Enter your password"
					 		placeholder="yoursecretpassword"
					 		component={ CustomInput } />
					</fieldset>

					{ this.props.errorMessage ?
					<div className="alert alert-danger">
						{ this.props.errorMessage }	
					</div> : null }

					<button type="submit" className="btn btn-primary">Sign In</button>
				</form>	
			 </div>
			 <div className="col">
			   <div className="text-center">	
			      <div className="alert alert-primary">
			   		or sign in using third party services
			      </div>
			      <GoogleLogin 
			      clientId="number"
			      render={renderProps => (
                  <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
              	  )}
			      onSuccess={this.responseGoogle}
			      onFailure={this.responseGoogle}
			      className="btn btn-outline-danger"
			      />
			      <FacebookLogin 
			      appId="number"
			      render={renderProps => (
                  <button style={{ marginRight: 15 }} className="btn btn-primary" onClick={renderProps.onClick}>Facebook</button>
                  )}
			      fields="name, email, picture"
			      callback={this.responseFacebook}
			      cssClass="btn btn-outline-primary"
			      />
			   </div>
			 </div>
			</div> 
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.errorMessage
	}
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({form: 'signin'})
)(SignIn) 