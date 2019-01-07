import { FETCH_TRUCKS } from '../actions/types';

const INITIAL_STATE = {
	trucks: []
}

export default function(state=INITIAL_STATE, action) {
	// console.log('in trucks reducer: action.payload: ', action.payload);
	switch (action.type) {
		case FETCH_TRUCKS:
			return { ...state, trucks: action.payload };
		// case TRUCKS_ERROR:
		// 	return {...state, errorMessage: action.payload }
		default:
			return state;
	}
}
