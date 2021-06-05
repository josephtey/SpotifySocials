import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './src/reducers/auth';
import friends from './src/reducers/friends';
import profile from './src/reducers/profile';
import notifications from './src/reducers/notifications';
import logger from 'redux-logger'

export default createStore(
  combineReducers({ auth, friends, profile, notifications }),
  applyMiddleware(thunk)
);