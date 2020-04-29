import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { incidentReducer } from './incidentReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
  catalog: categoryReducer,
  incidents: incidentReducer,
});
