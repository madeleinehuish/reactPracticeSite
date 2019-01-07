import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import currentCard from './currentCard';
import storeFilterText from './cardFilters';
import storeType from './storeType';
import trucks from './trucks';

export default combineReducers({
	auth,
	cards,
	currentCard,
	storeFilterText,
	storeType,
	trucks,
	form: formReducer
 });
