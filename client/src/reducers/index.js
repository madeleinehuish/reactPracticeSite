import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import currentCard from './currentCard';
import cardFilters from './cardFilters';
import trucks from './trucks';
import testCards from './testCards';

export default combineReducers({
	auth,
	cards,
	currentCard,
	cardFilters,
	trucks,
	form: formReducer,
	testCards
 });
