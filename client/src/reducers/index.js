import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import columnTwo from './columnTwo';
import currentCard from './currentCard';
import currentBlock from './currentBlock';
import cardFilters from './cardFilters';
import currentStandard from './currentStandard';
import currentDeck from './currentDeck';
import decks from './decks';
import trucks from './trucks';
import testCards from './testCards';

export default combineReducers({
	auth,
	cards,
	decks,
	currentBlock,
	currentCard,
	cardFilters,
	columnTwo,
	currentDeck,
	currentStandard,
	trucks,
	form: formReducer,
	testCards
 });
