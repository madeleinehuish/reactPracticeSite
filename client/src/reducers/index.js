import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import currentCard from './currentCard';
import cardFilters from './cardFilters';
// import storeType from './storeType';
import trucks from './trucks';

export default combineReducers({
	auth,
	cards,
	currentCard,
	cardFilters,
	// storeFilterText,
	// storeType,
	trucks,
	form: formReducer
 });
