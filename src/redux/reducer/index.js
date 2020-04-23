import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
});
