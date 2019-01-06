import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'
import App from './components/App';


const store = createStore(
	reducers,
	{
		auth:{ //initial state
			authenticated: localStorage.getItem('token'),
			user: {
				firstname: localStorage.getItem('user_firstname'),
				lastname: localStorage.getItem('user_lastname'),
				email: localStorage.getItem('user_email')
			}
		},
		trucks: [],
		cards: [],
		currentCard: {}
	},
	applyMiddleware(reduxThunk)
);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)
