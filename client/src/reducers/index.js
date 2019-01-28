import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import columnTwo from './columnTwo';
import currentCard from './currentCard';
import cardFilters from './cardFilters';
import currentDeck from './currentDeck';
import decks from './decks';
import trucks from './trucks';
import testCards from './testCards';

export default combineReducers({
	auth,
	cards,
	decks,
	currentCard,
	cardFilters,
	columnTwo,
	currentDeck,
	trucks,
	form: formReducer,
	testCards
 });
