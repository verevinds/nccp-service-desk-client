import { USERS_REQUEST_SUCCESSED, USERS_UPDATE } from '../constants';

export const usersUpdate = () => ({ type: USERS_UPDATE });
export const usersRequestSeccessed = (data) => ({
  type: USERS_REQUEST_SUCCESSED,
  data,
});
