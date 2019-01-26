import { DECK_ADD_TO_DECK } from '../actions/types';

const INITIAL_STATE = {  };

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {
		case DECK_ADD_TO_DECK:
			// return { ...state, action.payload };
			// return { ...state, currentDeck: [ ...state.currentDeck, action.payload]}
			return { ...state, currentDeck: [ ...state.currentDeck, action.payload ] };
		default:
			return state;
	}
}
