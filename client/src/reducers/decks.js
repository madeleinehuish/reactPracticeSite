import { GET_DECKS_FROM_DB } from '../actions/types';

const INITIAL_STATE = {  };

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {

		case GET_DECKS_FROM_DB:
			return { ...state, decks: action.payload };

		default:
			return state;
	}
}
