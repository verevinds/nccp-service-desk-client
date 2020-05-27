import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { incidentReducer } from './incidentReducer';
import { statusReducer } from './statusReducer';
import { positionReducer } from './positionReducer';
import { usersReducer } from './usersReducer';
import { accessReducer } from './accessReducer';
import { fileReducer } from './fileReducer';
import { progressReducer } from './progressReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
  catalog: categoryReducer,
  incidents: incidentReducer,
  status: statusReducer,
  positions: positionReducer,
  users: usersReducer,
  access: accessReducer,
  file: fileReducer,
  progress: progressReducer,
});
