import { DASHBOARD_GET_DATA } from '../actions/types';

const DEFAULT_STATE = {
	secret: ''
}

//this function figures what the state is and returns the state
export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case DASHBOARD_GET_DATA:
		return { ...state, secret: action.payload }
		default:
			return state
	}	
}