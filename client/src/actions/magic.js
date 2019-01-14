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
		if(card.color_identity.length===0) {
			return card.colors!=='White' && card.colors!=='Blue' && card.colors!=='Red' && card.colors!=='Green'&& card.colors!=='Black';
		} else {
				return card.color_identity.includes(colorFilter);
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
		return card.type_line.includes(typeFilter);
	})
	return filtered;
}


export const getcards = (filterValue, typeFilter, colorFilter, rarityFilter, setFilter, cb) => async dispatch => {

	let cards = DATA;

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

export const getCardsFromDatabase = (filters, cb) => async dispatch => {
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
			type: TEST_CARDS,
			payload: response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}

}
