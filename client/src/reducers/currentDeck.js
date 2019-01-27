import { DECK_ADD_TO_DECK, STORE_DECK_NAME } from '../actions/types';

const INITIAL_STATE = {  };

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {
		case DECK_ADD_TO_DECK:
			return { ...state, currentDeck: action.payload };

		case STORE_DECK_NAME:
			return { ...state, name: action.payload } ;

		default:
			return state;
	}
}
