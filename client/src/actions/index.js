import axios from 'axios';
import DATA from '../data/combinedData';
import { AUTH_USER,
				 AUTH_ERROR,
				 FETCH_TRUCKS,
				 FETCH_CARDS,
				 CHANGE_CURRENT_CARD,
				 STORE_TYPE,
				 STORE_FILTER_TEXT,
				 STORE_COLOR,
				 STORE_RARITY,
				 STORE_SET
			 } from './types';

export const signup = (formProps, callback) => async dispatch => {
	try {

		// dev
		const response = await axios.post('http://localhost:3090/signup', formProps);

		// // // prod
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

export const signout = (callback) => async dispatch => {
	localStorage.removeItem('token');
	localStorage.removeItem('user_firstname');
	localStorage.removeItem('user_lastname');
	localStorage.removeItem('user_email');

	dispatch({ type: FETCH_TRUCKS, payload: [] });
	dispatch({ type: AUTH_USER, payload: '' });
	dispatch({ type: AUTH_ERROR, payload: ''});

	callback();
}

export const gettrucks = (filterValue, cb) => async dispatch => {
	if(!cb && typeof filterValue === 'function') cb = filterValue;
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
	console.log(timeCurrent, dayCurrent); //logging so they are used. i plan to use these variables soon.

	const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
  const query = `${baseUrl}?dayorder=${day}`;

	const filteredByTime = arr => {
    	const filterThis = arr.filter(elem => {
    		const start24 = Number(elem.start24.substr(0,2));
    		const end24 = Number(elem.end24.substr(0,2));

    		return start24 <= hour && hour < end24;
    	})
    	return filterThis;
    }

		const response = await fetch(query);
		const truckArray = await response.json();

	  //filter by current time
		const trucksFilteredByTime = filteredByTime(truckArray);

		//trying input filter
		if(filterValue.length) {
			 const trucksFilteredByInputAndTime = trucksFilteredByTime.filter(elem => {
						return elem.applicant.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
			 })
			 dispatch({
				 type: FETCH_TRUCKS,
 				 payload: trucksFilteredByInputAndTime
			 });

		} else {

			dispatch ({
				type: FETCH_TRUCKS,
				payload: trucksFilteredByTime
			});
		}

		cb();
}

// function filterDoubleCards(cards) {
//
// 	let sortedByDoubleSided = cards.filter((card, index) => {
// 		let doesCardHaveDouble = card.number.charAt(card.number.length - 1); //checks if a 'b'
// 		if(doesCardHaveDouble === 'a') {
// 			card.double = cards[index + 1];
// 			return card;
// 		}
// 		if(doesCardHaveDouble === 'b') {
// 			card.double = cards[index - 1];
// 			return card;
// 		}
// 	})
// }

function filterAlphabetically(cards) {
	let sortedAlphabetically = cards.sort((a,b) =>{
		if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0;
	})
	return sortedAlphabetically;
}

function filterByColor(cards, colorFilter) {
	if(colorFilter==='All') return cards;

	let filtered = cards.filter(card => {
		if(!card.colorIdentity) {
			return card.colors!=='White' || card.colors!=='Blue' && card.colors!=='Red' && card.colors!=='Green'&& card.colors!=='Black';
		} else {
				return card.colorIdentity.includes(colorFilter);
		}
	})

	return filtered;
}

function filterByInput(cards, filterValue) {
	if(filterValue==='') return cards;

	let filtered = cards.filter(card => {
		 return card.name.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
	 })

	 return filtered;
}

function filterByRarity(cards, filterValue) {
	if(filterValue==='All') return cards;

	let filtered = cards.filter(card => {
		return card.rarity===filterValue;
	})

	return filtered;
}

function filterBySet(cards, setFilter) {
	if(setFilter==='All') return cards;

	let filtered = cards.filter(card => {
		return card.set===setFilter;
	})

	return filtered;
}

function filterByType(cards, typeFilter) {
	if(typeFilter==='All') return cards;

	let filtered = cards.filter(card => {
		return card.types.includes(typeFilter);
	})
	return filtered;
}


export const getcards = (filterValue, typeFilter, colorFilter, rarityFilter, setFilter, cb) => async dispatch => {

	let cards = DATA;

	// cards = filterDoubleCards(cards); //this filter should be first as index needs to be in set order

	cards = filterBySet(cards, setFilter);

	cards = filterByType(cards, typeFilter);

	cards = filterByColor(cards, colorFilter);

	cards = filterByRarity(cards, rarityFilter);

	cards = filterByInput(cards, filterValue);

	cards = filterAlphabetically(cards);

	// add logic for case where cards.length === 0

	if(!cards.length) cards[0] =  {
		name: "There are no cards with these given filters",
		imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
	};

	dispatch({
		type: FETCH_CARDS,
		payload: cards
	})

	cb();

}

export const changeCurrentCard = (card) => {

	return {
		type: CHANGE_CURRENT_CARD,
		payload: card
	}
}

export const storeFilterText = (text, cb) => async dispatch => {
	dispatch({
		type: STORE_FILTER_TEXT,
		payload: text
	});
	cb()
}

export const storeType = (type, cb) => async dispatch => {

	dispatch({
		type: STORE_TYPE,
		payload: type
	});
	cb();
}

export const storeColor = (color, cb) => async dispatch => {

	dispatch({
		type: STORE_COLOR,
		payload: color
	});
	cb();
}

export const storeRarity = (rarity, cb) => async dispatch => {

	dispatch({
		type: STORE_RARITY,
		payload: rarity
	});
	cb();
}

export const storeSet = (set, cb) => async dispatch => {

	dispatch({
		type: STORE_SET,
		payload: set
	});
	cb();
}
