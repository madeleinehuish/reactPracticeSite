import { STORE_FILTER_TEXT, STORE_TYPE, STORE_COLOR } from '../actions/types';

const INITIAL_STATE = {
	filterText: '',
	filterType: 'All'
};

export default function(state=INITIAL_STATE, action) {
	// console.log('in filterCardByType reducer: action.payload: ', action.payload);
	switch (action.type) {
		case STORE_FILTER_TEXT:
			return { ...state, filterText: action.payload };
		case STORE_TYPE:
			return { ...state, filterType: action.payload };
		case STORE_COLOR:
			return { ...state, filterColor: action.payload };
		default:
			return state;
	}
}
