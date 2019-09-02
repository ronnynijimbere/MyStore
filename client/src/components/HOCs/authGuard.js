import React, { Component } from 'react';
import { connect } from 'react-redux';


//Receive a component that is being protected

export default (OriginalComponent) => {
	class MixedComponent extends Component {

		//check whether the user is authenticated
		checkAuth() {
			if (!this.props.isAuth && !this.props.jwtToken) {
			this.props.history.push('/');
			}
		}			

		componentDidMount() {
			this.checkAuth();
		}


		componentDidUpdate() {
			this.checkAuth();
		}


		render() {
			return <OriginalComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
	return {
		isAuth: state.auth.isAuthenticated,
		jwtToken: state.auth.token
	}
}
	return connect(mapStateToProps)(MixedComponent);
};