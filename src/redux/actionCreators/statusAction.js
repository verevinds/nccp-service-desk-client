import { STATUS_REQUEST_SUCCESSED, STATUS_UPDATE } from '../constants';

export const statusUpdate = () => ({ type: STATUS_UPDATE });
export const statusRequestSeccessed = (data) => ({
  type: STATUS_REQUEST_SUCCESSED,
  data,
});
