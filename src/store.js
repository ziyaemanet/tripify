import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers';
import * as Actions from './actions/FirebaseActions';


let middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  // ...
];

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware)
));

// store.dispatch(Actions.verifyAuth());

export default store;
