import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import currentCard from './currentCard';
import cardFilters from './cardFilters';
import currentDeck from './currentDeck';
import trucks from './trucks';
import testCards from './testCards';

export default combineReducers({
	auth,
	cards,
	currentCard,
	cardFilters,
	currentDeck,
	trucks,
	form: formReducer,
	testCards
 });
