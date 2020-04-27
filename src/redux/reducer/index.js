import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
});
