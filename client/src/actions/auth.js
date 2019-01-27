import axios from 'axios';
import { AUTH_USER,
				 AUTH_ERROR,
			 } from './types';

export const signup = (formProps, callback) => async dispatch => {
	try {

		// // dev
		const response = await axios.post('http://localhost:3090/signup', formProps);

		// // prod
		// const response = await axios.post('https://radiant-stream-78248.herokuapp.com/signup', formProps);

		const payload = {
			token: response.data.token,
			user: {
				firstname: response.data.user.firstname,
				lastname: response.data.user.lastname,
				email: response.data.user.email
			}
		};

		dispatch({ type: AUTH_USER, payload: payload });

		localStorage.setItem('token', response.data.token);
		localStorage.setItem('user_firstname', response.data.user.firstname);
		localStorage.setItem('user_lastname', response.data.user.lastname);
		localStorage.setItem('user_email', response.data.user.email);
		callback();
	} catch(e) {
		dispatch({ type: AUTH_ERROR, payload: 'Email in use.' })
	}

};

export const signin = (formProps, callback) => async dispatch => {

	try {

		// // dev
		const response = await axios.post('http://localhost:3090/signin', formProps);

		// // prod
		// const response = await axios.post('https://radiant-stream-78248.herokuapp.com/signin', formProps);

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

export const signout = (callback) => async dispatch => {
	localStorage.removeItem('token');
	localStorage.removeItem('user_firstname');
	localStorage.removeItem('user_lastname');
	localStorage.removeItem('user_email');

	dispatch({ type: AUTH_USER, payload: '' });
	dispatch({ type: AUTH_ERROR, payload: ''});

	callback();
}
