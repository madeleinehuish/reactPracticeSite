import { FETCH_BLOCKS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
	// console.log('in cards reducer: action.payload: ', action.payload);
	switch (action.type) {
		case FETCH_BLOCKS:
			return { ...state, name: action.name, sets: action.payload };

		default:
			return state;
	}
}
