import axios from 'axios';
import { AUTH_USER,
				 AUTH_ERROR,
				 DECK_ADD_TO_DECK,
				 CHANGE_CURRENT_CARD,
			 	 SET_COLUMN_TWO,
			 } from './types';
import firstCard from '../data/firstCard';
import getUrl from './development.js';

export const signup = (formProps, callback) => async dispatch => {
	try {
		const url = getUrl('/signup');
		const response = await axios.post(url, formProps);
		// // // dev
		// const response = await axios.post('http://localhost:3090/signup', formProps);

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
	console.log('in signin')
	try {
		const url = getUrl('/signin');
		// console.log('url: ', url);
		// // // dev
		// const response = await axios.post('http://localhost:3090/signin', formProps);

		// // prod
		// const response = await axios.post('https://radiant-stream-78248.herokuapp.com/signin', formProps);

		const response = await axios.post(url, formProps);

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
	dispatch({ type: DECK_ADD_TO_DECK, payload: [] });
	dispatch({ type: CHANGE_CURRENT_CARD, payload: firstCard });
	dispatch({ type: SET_COLUMN_TWO, payload: false });

	callback();
}
