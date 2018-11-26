import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_TRUCKS } from './types';

export const signup = (formProps, callback) => async dispatch => {
	try {

		// dev
		const response = await axios.post('http://localhost:3090/signup', formProps);

		// // // prod
		// const response = await axios.post('https://radiant-stream-78248.herokuapp.com/signup', formProps);

		// const payload = {
		// 	token: response.data.token,
		// 	user: {
		// 		firstname: response.data.firstname,
		// 		lastname: response.data.lastname,
		// 		email: response.data.email
		// 	}
		// }

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

		// dev
		const response = await axios.post('http://localhost:3090/signin', formProps);

		// // // prod
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


export const signout = () => {
	localStorage.removeItem('token');

	return {
		type: AUTH_USER,
		payload: ''
	}
}

export const gettrucks = (cb) => async dispatch => {
	//get current date and time
	const date = new Date();
	const day = date.getDay();
	const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const hour = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
	  minutes = '0' + minutes;
	}
	let hour12 = hour;
	let twelve;
	if(hour>12) {
	  hour12 = hour - 12;
	  twelve = 'PM'
	} else if (hour===12){
	  twelve = 'PM';
	} else twelve = 'AM';
	const timeCurrent = hour12 + ':' + minutes + twelve;
	const dayCurrent = days[day];

	const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
  const query = `${baseUrl}?dayorder=${day}`;

	const filtered = arr => {
    	const filterThis = arr.filter(elem => {
    		const start24 = Number(elem.start24.substr(0,2));
    		const end24 = Number(elem.end24.substr(0,2));

    		return start24 <= hour && hour < end24;
    	})
    	return filterThis;
    }

		// const fetchTrucks = async () => {
		const response = await fetch(query);
		const truckArray = await response.json();

	  		//filter by current time
		const truckFiltered = filtered(truckArray);

		dispatch ({
			type: FETCH_TRUCKS,
			payload: truckFiltered
		});
		cb()
}
