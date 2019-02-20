import { FETCH_CARDS, UPDATE_CARDS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
	// console.log('in cards reducer: action.payload: ', action.payload);
	switch (action.type) {
		case FETCH_CARDS:
			return { ...state, base: action.payload, cards: action.payload };
			break;

		// case MAGIC_ERROR:
		// 	return {...state, errorMessage: action.payload }
		case UPDATE_CARDS:
			return { ...state, cards: action.payload }
			break;
		default:
			return state;
	}
}
