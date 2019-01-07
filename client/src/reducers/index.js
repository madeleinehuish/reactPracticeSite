import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import currentCard from './currentCard';
import filterCardByType from './filterCardByType';
import trucks from './trucks';

export default combineReducers({
	auth,
	cards,
	currentCard,
	filterCardByType,
	trucks,
	form: formReducer
 });
