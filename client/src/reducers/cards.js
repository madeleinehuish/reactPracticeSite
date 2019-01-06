import { FETCH_CARDS } from '../actions/types';

const INITIAL_STATE = {
	cards: []
}

export default function(state=INITIAL_STATE, action) {
	console.log('in cards reducer: action.payload: ', action.payload);
	switch (action.type) {
		case FETCH_CARDS:
			return { ...state, cards: action.payload };
		// case MAGIC_ERROR:
		// 	return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
