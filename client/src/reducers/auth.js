import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
	user: null,
	authenticated: '',
	errorMessage: ''
}

export default function(state=INITIAL_STATE, action) {
	// console.log('in reducer: action.payload: ', action.payload);
	switch (action.type) {
		case AUTH_USER:
			return { ...state, authenticated: action.payload.token, user: action.payload.user };
		case AUTH_ERROR:
			return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
