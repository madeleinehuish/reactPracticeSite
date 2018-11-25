import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import trucks from './trucks';

export default combineReducers({
	auth,
	trucks,
	form: formReducer
 });
