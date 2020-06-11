import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { incidentReducer } from './incidentReducer';
import { statusReducer } from './statusReducer';
import { usersReducer } from './usersReducer';
import { accessReducer } from './accessReducer';
import { progressReducer } from './progressReducer';
import { errorReducer } from './errorReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
  catalog: categoryReducer,
  incidents: incidentReducer,
  status: statusReducer,
  users: usersReducer,
  access: accessReducer,
  progress: progressReducer,
  error: errorReducer,
});
