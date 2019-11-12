import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rooms from '../_reducers/rooms';
import customers from '../_reducers/customers';
import checkin from '../_reducers/checkin';
import profile from '../_reducers/profile';

// The Global state
const rootReducer = combineReducers({
  rooms,
  customers,
  checkin,
  profile,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
