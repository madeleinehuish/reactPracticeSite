import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
	try {
		const response = await axios.post('http://localhost:3090/signup', formProps);

		// const payload = {
		// 	token: response.data.token,
		// 	user: {
		// 		firstname: response.data.firstname,
		// 		lastname: response.data.lastname,
		// 		email: response.data.email
		// 	}
		// }

		dispatch({ type: AUTH_USER, payload: response.data.token });
		localStorage.setItem('token', response.data.token);
		callback();
	} catch(e) {
		dispatch({ type: AUTH_ERROR, payload: 'Email in use.' })
	}

};

export const signin = (formProps, callback) => async dispatch => {
	try {
		const response = await axios.post('http://localhost:3090/signin', formProps);
		// console.log('in signin: response.data: ', response.data);
		const payload = {
			token: response.data.token,
			user: {
				firstname: response.data.user.firstname,
				lastname: response.data.user.lastname,
				email: response.data.user.email
			}
		}

		dispatch({ type: AUTH_USER, payload: payload });
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('user_firstname', payload.user.firstname);
		localStorage.setItem('user_lastname', payload.user.lastname);
		localStorage.setItem('user_email', payload.user.email);
		callback();
	} catch(e) {
		dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials.' })
	}

};


export const signout = () => {
	localStorage.removeItem('token');

	return {
		type: AUTH_USER,
		payload: ''
	}
}
