import initialState from '../initialState';

const INITIAL_STATE = initialState;

export default function(state=INITIAL_STATE, action) {
	// console.log('in cards reducer: action.payload: ', action.payload);
	switch (action.type) {

		default:
			return state;
	}
}
