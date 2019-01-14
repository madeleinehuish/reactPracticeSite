import axios from 'axios';
import DATA from '../data/combinedData';

import {
	FETCH_CARDS,
	CHANGE_CURRENT_CARD,
	STORE_TYPE,
	STORE_FILTER_TEXT,
	STORE_COLOR,
	STORE_RARITY,
	STORE_SET,
	TEST_CARDS
} from './types';


//new filter functions

function filterByInput(cards, filterValue) {
	if(filterValue==='') return cards;

	let filtered = cards.filter(card => {
		 return card.name.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
	 })

	 return filtered;
}

const filterSet = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.set===filter) return true;
	return false;
}

const filterType = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.type_line.includes(filter)) return true;
	return false;
}

const filterColor = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.color_identity.includes(filter)) return true;
	return false;
}

const filterRarity = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.rarity===filter) return true;
	return false;
}

// this is a newer version of this function. old versions below
export const getcards = (filters, cb) => async dispatch => {

	const data = DATA; //first decide how big of dataset you want to use. 'All will default to full set'
	// console.log('filters: ', filters);
	console.log('data: ', data);
	// return data;
	// let filtered = data;
	const filteredByInput = filterByInput(data, filters.text);

	const filtered = filteredByInput.filter(elem => {

		const conditionSet = filterSet(elem, filters.set);
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionSet && conditionType && conditionColor && conditionRarity);
	})

	if(!filtered.length) filtered[0] =  {
		name: "There are no cards with these given filters",
		imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
	};

	dispatch({
		type: FETCH_CARDS,
		payload: filtered
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

//this is for calling from the backend, it is not operating yet
export const getCardsFromDatabase = (filters, cb) => async dispatch => {

	// //can be used to hardcode testFilters
	// const testFilters = {
	// 	set: 'Innistrad',
	// 	type: 'Creature',
	// 	color: 'W',
	// 	rarity: 'rare'
	// }

	const url = 'http://localhost:3090/cards'
	const query = `?set=${filters.set}&type=${filters.type}&color=${filters.color}&rarity=${filters.rarity}`

	try {
		const response = await axios.get(url + query);

		let payload = response.data;

		console.log('response: ', response);
		// dispatch({
		// 	type: TEST_CARDS,
		// 	payload: response.data.testArray
		// })
		dispatch({
			// type: FETCH_CARDS,
			type: TEST_CARDS,
			payload: response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}

}


// //old filter functions
// function filterAlphabetically(cards) {
// 	let sortedAlphabetically = cards.sort((a,b) =>{
// 		if(a.name < b.name) return -1;
// 		if(a.name > b.name) return 1;
// 		return 0;
// 	})
// 	return sortedAlphabetically;
// }
// function filterByColor(cards, colorFilter) {
// 	if(colorFilter==='All') return cards;
//
// 	let filtered = cards.filter(card => {
// 		if(card.color_identity.length===0) {
// 			return card.colors!=='White' && card.colors!=='Blue' && card.colors!=='Red' && card.colors!=='Green'&& card.colors!=='Black';
// 		} else {
// 				return card.color_identity.includes(colorFilter);
// 		}
// 	})
//
// 	return filtered;
// }
//
//
// function filterByRarity(cards, filterValue) {
// 	if(filterValue==='All') return cards;
//
// 	let filtered = cards.filter(card => {
// 		return card.rarity===filterValue;
// 	})
//
// 	return filtered;
// }
//
// function filterBySet(cards, setFilter) {
//
// 	if(setFilter==='All') return cards;
//
// 	let filtered = cards.filter(card => {
// 		return card.set===setFilter;
// 	})
//
// 	return filtered;
// }
//
// function filterByType(cards, typeFilter) {
// 	if(typeFilter==='All') return cards;
//
// 	let filtered = cards.filter(card => {
// 		return card.type_line.includes(typeFilter);
// 	})
// 	return filtered;
// }

// export const getcards = (filterValue, typeFilter, colorFilter, rarityFilter, setFilter, cb) => async dispatch => {
//
// 	let cards = DATA;
//
// 	cards = filterBySet(cards, setFilter);
//
// 	cards = filterByType(cards, typeFilter);
//
// 	cards = filterByColor(cards, colorFilter);
//
// 	cards = filterByRarity(cards, rarityFilter);
//
// 	cards = filterByInput(cards, filterValue);
//
// 	cards = filterAlphabetically(cards);
//
// 	// add logic for case where cards.length === 0
//
// 	if(!cards.length) cards[0] =  {
// 		name: "There are no cards with these given filters",
// 		imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
// 	};
//
// 	dispatch({
// 		type: FETCH_CARDS,
// 		payload: cards
// 	})
//
// 	cb();
//
// }
