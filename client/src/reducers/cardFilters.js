import { STORE_FILTER_TEXT } from '../actions/types';

const INITIAL_STATE = {
	filterText: ''
};

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {
		case STORE_FILTER_TEXT:
			return { ...state, filterText: action.payload };
		default:
			return state;
	}
}
