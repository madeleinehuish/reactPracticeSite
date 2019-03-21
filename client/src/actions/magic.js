import axios from 'axios';
import standardBlocks from '../data/standard_blocks/standard_blocks.js';
// import DATA from '../data/combinedData'; //standard
// import DATA from '../data/combinedDataTest' //mirrodin test run

import {
	DECK_ADD_TO_DECK,
	GET_DECKS_FROM_DB,
	FETCH_CARDS,
	UPDATE_BLOCK,
	UPDATE_CARDS,
	CHANGE_CURRENT_CARD,
	SET_COLUMN_TWO,
	STORE_DECK_NAME,
	STORE_TYPE,
	STORE_CREATURE,
	STORE_KEYWORD,
	STORE_FILTER_TEXT,
	STORE_COLOR,
	STORE_RARITY,
	STORE_SET,
	STORE_SPECIAL
	// TEST_CARDS
} from './types';

function isSubset(arr, sub) {
	let arrMap = {};

	for(let elem of arr) {
		arrMap[elem] = (arrMap[elem] || 0) + 1;
	}

	for(let elem of sub) {
		if(!arrMap[elem]) return false;
	}

	return true;
}

//filter functions

function filterByInput(cards, filterValue) {
	console.log('CARDS in INPUT: ', cards);
	if(filterValue==='') return cards;
	if(!cards) return;

	let filtered = cards.filter(card => {
		 return card.name.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
	 })

	 return filtered;
}

// // DON'T remove this until back end filtering figured out
// const filterSet = (elem, filter) => {
// 	if(filter==='All') return true;
// 	if(elem.set===filter) return true;
// 	return false;
// }

const filterType = (elem, filterType, filterCreature) => {
	if(filterType==='All') return true;
	if(filterType==='Creature' && filterCreature==='All Creatures') {
		if(elem.type_line.includes(filterType)) return true;
		return false;
	};
	if(filterType==='Creature' && filterCreature!=='All Creatures') {
		if(elem.type_line.includes(filterCreature)) return true;
		return false;
	} else {
		if(elem.type_line.includes(filterType)) return true;
		return false;
	}
}

const filterKeyword = (elem, filterKeyword) => {
	if(filterKeyword==='keywords (all)') return true;
	// console.log('elem.oracle_text: ', elem.oracle_text)
	if(filterKeyword === 'return from graveyard') {
		if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes('graveyard')) return true;
	}
	if(filterKeyword === 'return to hand') {
		if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes("owner's hand")) return true;
	}

	if(elem.oracle_text && elem.oracle_text.toLowerCase().includes(filterKeyword)) return true;
	return false;
}

//check arr
const filterColor = (elem, filtersColors, filtersType) => {

	if(!Array.isArray(filtersColors) && filtersColors==='All') return true;
	if(!Array.isArray(filtersColors) && filtersColors==='Colorless') {
		if(elem.color_identity && elem.color_identity.length > 0) return false //removes colored lands
		if(elem.colors && elem.colors.length === 0) return true; //all other colorless cases
		return false;
	}
	if(elem.layout==='transform') {
		// return true;
		if(filtersType==='Land') {
			if(!elem.card_faces[0].colors.length && !elem.card_faces[1].colors.length) return false; //so colored filter doesn't return colorless lands
			if(isSubset(filtersColors, elem.color_identity)) return true;
			return false;
		}	else  {
			if(!elem.card_faces[0].colors.length && elem.color_identity.length > 0) { //if color picked but filtersType !== land
				if(isSubset(filtersColors, elem.color_identity)) return true;
				return false;
			}
			if((elem.card_faces[0].colors.length!==0 && isSubset(filtersColors, elem.card_faces[0].colors))
						||
					(elem.card_faces[1].colors.length!==0 && isSubset(filtersColors, elem.card_faces[1].colors))) {
						return true;
					}
			return false;
		}

	} else { //elem.layout === 'normal' (non transformable cards)
		if(filtersType==='Land') {
			if(!elem.color_identity.length) return false; //so colored filter doesn't return colorless lands
			if(isSubset(filtersColors, elem.color_identity)) return true;
			return false;
		}	else  {
			if(!elem.colors.length && elem.color_identity.length > 0) { //if color picked but filtersType !== land
				if(isSubset(filtersColors, elem.color_identity)) return true;
				return false;
			}
			if(!elem.colors.length) return false;
			if(isSubset(filtersColors, elem.colors)) return true;
			return false;
		}

	}

}

const filterRarity = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.rarity===filter) return true;
	return false;
}

const filterSpecial = (elem, filter) => {
	if(filter==='All Special') return true;
	if(filter==='legendary') {
		if(elem.type_line.includes('Legendary')) return true;
	}
	if(filter==='saga') {
		if(elem.type_line.includes('Saga')) return true;
	}
	if(filter==='historic') {
		if(elem.type_line.includes('Saga') || elem.type_line.includes('Legendary') || elem.type_line.includes('Artifact')) return true;
	}
	return false;
}



export const getcards = (base, filters, resetTrue, cb) => async dispatch => {

	const data = base; //first decide how big of dataset you want to use. 'All will default to full set'

	const filteredByInput = filterByInput(data, filters.text);

	const filtered = filteredByInput.filter(elem => {

		// const conditionSet = filterSet(elem, filters.set);
		const conditionKeyword = filterKeyword(elem, filters.keyword);
		const conditionType = filterType(elem, filters.type, filters.creature);
		const conditionColor = filterColor(elem, filters.color, filters.type);
		const conditionRarity = filterRarity(elem, filters.rarity);
		const conditionSpecial = filterSpecial(elem, filters.special);


		return ( conditionKeyword && conditionType && conditionColor && conditionRarity && conditionSpecial );
	})

	if(!filtered.length) filtered[0] =  {
		name: "There are no cards with these given filters",
		imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
	};

	if(resetTrue) {
		dispatch({
			type: FETCH_CARDS,
			payload: filtered
		})
	} else {
		dispatch({
			type: UPDATE_CARDS,
			payload: filtered
		})
	}

	cb();
}


export const getDecksFromDB = (cb) => async dispatch => {

	//development
	const url = 'http://localhost:3090/decks';

	// //production
	// const url = 'https://radiant-stream-78248.herokuapp.com/decks';

	const email = localStorage.getItem('user_email');

	const query = `?email=${email}`

	try {
		const response = await axios.get(url + query);

		console.log('response: ', response);

		dispatch({
			type: GET_DECKS_FROM_DB,
			payload: await response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}
}

export const modifyDeck = (card, deck, sign, cb) => async dispatch => {

	switch(sign) {
		case 'add':
					{
						console.log('deckAddTo card: ', card);
						console.log('deck: ', )
						// let currentNumber = 0;
						let newDeck = [...deck];
						let isDup = false;

						for(let elem of newDeck) {
							if(elem.name && elem.name === card.name ) {
								isDup = true;
								if(elem.number < 4) {
									elem.number = elem.number + 1;
								} else {
									elem.number = 4;
								}
							}
						}

						if(isDup===false) newDeck.push({
							name: card.name,
							number: 1,
							info: card
						});


						dispatch({
							type: DECK_ADD_TO_DECK,
							payload: newDeck
						});

						cb()
					}
					break;
		case 'delete':
					{
						let newDeck = [...deck];

						newDeck.forEach(elem => {
							if(elem.name && elem.name === card.name) {
								elem.number = elem.number - 1;
							}
						})
						let filtered = newDeck.filter(elem => {
							return elem.number > 0;
						})

						dispatch({
							type: DECK_ADD_TO_DECK,
							payload: filtered
						});

						cb();
					}
					break;
		// case 'changeDeck':
		// {
		// 	dispatch({
		// 		type: DECK_ADD_TO_DECK,
		// 		payload: deck
		// 	})
		// 	cb();
		// }
		// break;
		case 'reset':
					{
						let newDeck = [];

						dispatch ({
							type: DECK_ADD_TO_DECK,
							payload: newDeck
						});
						dispatch({
							type: STORE_DECK_NAME,
							payload: 'unnamed deck'
						});
						//add another dispatch here to modify select state and possibly input state

						cb()
					}
						break;
					default:
						break;
				}

}

export const changeCurrentCard = (card) => {

	return {
		type: CHANGE_CURRENT_CARD,
		payload: card
	}
}

export const setColumnTwo = (columnTwo) => {
	return {
		type: SET_COLUMN_TWO,
		payload: !columnTwo
	}
}

export const storeDeckName = (deckName, cb) => async dispatch => {
	dispatch({
		type: STORE_DECK_NAME,
		payload: deckName
	});
	cb();
}

export const storeFilterText = (text, cb) => async dispatch => {
	dispatch({
		type: STORE_FILTER_TEXT,
		payload: text
	});
	cb();
}

export const storeType = (type, cb) => async dispatch => {

	dispatch({
		type: STORE_TYPE,
		payload: type
	});
	cb();
}

export const storeCreature = (creature, cb) => async dispatch => {

	dispatch({
		type: STORE_CREATURE,
		payload: creature
	});
	cb();
}

export const resetBlock = (block, cb) => async dispatch => {
	dispatch({
		type: UPDATE_BLOCK,
		name: block.name,
		payload: block.sets
	})
	cb();
}

export const storeKeyword = (keyword, cb) => async dispatch => {

	dispatch({
		type: STORE_KEYWORD,
		payload: keyword
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

export const storeSpecial = (special, cb) => async dispatch => {

	dispatch({
		type: STORE_SPECIAL,
		payload: special
	});
	cb();
}

export const saveDeckToDB = (data) => async dispatch => {

	// //development
	const url = 'http://localhost:3090/decks';

	// //production
	// const url = 'https://radiant-stream-78248.herokuapp.com/decks';

	const email = localStorage.getItem('user_email');

	data.email = email;

	try {
		const response = await axios.post(url, data);

		console.log('response: ', response);

	} catch (error) {
		console.log('axios error: ', error);
	}
}

export const updateBlock = (name, cb) => async dispatch => {
	// //development
	const url = 'http://localhost:3090/filterbyblock';

	// //production
	// const url = 'https://radiant-stream-78248.herokuapp.com/filterbyblock';

	const sets = standardBlocks.filter(elem => { //this is unstable
		return elem.name===name
	})[0].sets;
	console.log('inside of actions.updateBlock: name: ', name, ' sets: ', sets);
	const query = `?name=${name}`;
	console.log('inside of actions.updateBlock: query: ', query);

	try {
		const response = await axios.get(url + query);

		console.log('response from get blocks: ', response);

		dispatch({
			type: UPDATE_BLOCK,
			name: name,
			payload: sets
		})

		dispatch({
			type: FETCH_CARDS,
			payload: response.data
		})

		cb();
	} catch (error) {
		console.log('axios error: ', error);
	}
}

export const getSingle = (term, cb) => async dispatch => {

	//http://localhost:3090/filtersinglecard?name=counterspell

	//development
	const url = 'http://localhost:3090/filtersinglecard';

	// //production
	// const url = 'https://radiant-stream-78248.herokuapp.com/filtersinglecard';

	const query = `?name=${term}`;

	try {
		const response = await axios.get(url + query);

		console.log('response: ', response);

		dispatch({
			type: FETCH_CARDS,
			payload: response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}

}

//this is for calling from the backend, it is not operating yet
export const getCardsFromDatabase = (filters, cb) => async dispatch => {

	//development
	const url = 'http://localhost:3090/cards';

	// //production
	// const url = 'https://radiant-stream-78248.herokuapp.com/cards';

	const query = `?set=${filters.set}&type=${filters.type}&color=${filters.colors}&rarity=${filters.rarity}`

	try {
		const response = await axios.get(url + query);

		console.log('response: ', response);

		dispatch({
			type: FETCH_CARDS,
			payload: response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}

}


export const getAllCardsFromDatabase = (filters, cb) => async dispatch => {

	const url = 'http://localhost:3090/allcards'
	const query = `?type=${filters.type}&color=${filters.colors}&rarity=${filters.rarity}`

	try {
		const response = await axios.get(url + query);


		console.log('response: ', response);

		dispatch({
			type: FETCH_CARDS,
			payload: response.data
		})

		cb()
	} catch (error) {
		console.log('axios error: ', error);
	}

}
