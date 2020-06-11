import {
  AUTH_FETCHING,
  AUTH_REQUEST_SENDD,
  AUTH_REQUEST_SUCCESSED,
  START_REQUEST_SUCCESSED,
  AUTH_INITIAL_APP,
} from '../constants';

export const authInitialApp = (response) => ({ type: AUTH_INITIAL_APP, response });
export const authFetching = (ip) => ({ type: AUTH_FETCHING, ip });
export const authRequestSendd = () => ({ type: AUTH_REQUEST_SENDD });
export const authRequestSuccessed = (data) => ({
  type: AUTH_REQUEST_SUCCESSED,
  data,
});
export const startRequestSuccessed = (data) => ({
  type: START_REQUEST_SUCCESSED,
  data,
});
