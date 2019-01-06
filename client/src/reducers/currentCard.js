import { CHANGE_CURRENT_CARD } from '../actions/types';

const INITIAL_STATE = {
	currentCard: {}
}

export default function(state=INITIAL_STATE, action) {
	console.log('in currentCard reducer: action.payload: ', action.payload);
	switch (action.type) {
		case CHANGE_CURRENT_CARD:
			return { ...state, currentCard: action.payload };
		// case MAGIC_ERROR:
		// 	return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
