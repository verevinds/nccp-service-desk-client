import { ACCESS_REQUEST_SUCCESSED, ACCESS_UPDATE } from '../constants';

export const accessUpdate = () => ({ type: ACCESS_UPDATE });
export const accessRequestSeccessed = (data) => ({
  type: ACCESS_REQUEST_SUCCESSED,
  data,
});
