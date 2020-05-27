import {
  USERS_REQUEST_SUCCESSED,
  USERS_UPDATE,
  USERS_CURRENT_REQUEST_SUCCESSED,
  USERS_CURRENT_UPDATE,
} from '../constants';

export const usersUpdate = () => ({ type: USERS_UPDATE });
export const usersRequestSeccessed = (data) => ({
  type: USERS_REQUEST_SUCCESSED,
  data,
});
export const usersCurrentUpdate = () => ({ type: USERS_CURRENT_UPDATE });
export const usersCurrentRequestSeccessed = (data) => ({
  type: USERS_CURRENT_REQUEST_SUCCESSED,
  data,
});
