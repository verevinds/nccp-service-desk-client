import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { incidentReducer } from './incidentReducer';
import { statusReducer } from './statusReducer';
import { usersReducer } from './usersReducer';
import { positionReducer } from './positionReducer';
import { accessReducer } from './accessReducer';
import { fileReducer } from './fileReducer';
import { progressReducer } from './progressReducer';
import { errorReducer } from './errorReducer';
import { applicationReducer } from './appReducer';
import { subscriptionReducer } from './subscriptionReducer';
import { filterReducer } from './filterReducer';
import { responsibleReducer } from './responsibleReducer';
import { settingReducer } from './settingReducer';
import { resourceReducer } from './resourceReducer';

export const CombineReducers = combineReducers({
  auth: authReducer,
  catalog: categoryReducer,
  incidents: incidentReducer,
  status: statusReducer,
  users: usersReducer,
  file: fileReducer,
  positions: positionReducer,
  access: accessReducer,
  progress: progressReducer,
  error: errorReducer,
  app: applicationReducer,
  subscription: subscriptionReducer,
  filter: filterReducer,
  responsible: responsibleReducer,
  setting: settingReducer,
  resources: resourceReducer,
});
