import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import friends from './reducers/friends';
import profile from './reducers/profile';

export default createStore(
  combineReducers({ auth, friends, profile }),
  applyMiddleware(thunk)
);