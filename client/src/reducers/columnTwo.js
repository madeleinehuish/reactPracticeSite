import { SET_COLUMN_TWO } from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
	// console.log('in currentCard reducer: action.payload: ', action.payload);
	switch (action.type) {
		case SET_COLUMN_TWO:
			return { ...state, columnTwo: action.payload };
		// case MAGIC_ERROR:
		// 	return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
