import reducers from './reducers';
import initialState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createDebounce from 'redux-debounced';

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

// let createStoreWithMiddleware = applyMiddleware(logger)(createStore)

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(
    // logger,
    createDebounce(),
    reduxThunk
  )
);

export default store;
