import reducers from './reducers';
import initialState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(reduxThunk)
);

export default store;
