import { TEST_CARDS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
	// console.log('in currentCard reducer: action.payload: ', action.payload);
	switch (action.type) {
		case TEST_CARDS:
			return { ...state, testCards: action.payload };
			// return { ...state, testCards: action.payload };
		// case MAGIC_ERROR:
		// 	return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
