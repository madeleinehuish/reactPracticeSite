import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cards from './cards';
import trucks from './trucks';

export default combineReducers({
	auth,
	cards,
	trucks,
	form: formReducer
 });
