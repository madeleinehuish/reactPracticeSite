import { STORE_TYPE } from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {
		case STORE_TYPE:
			return { ...state, typeSelected: action.payload };
		default:
			return state;
	}
}
