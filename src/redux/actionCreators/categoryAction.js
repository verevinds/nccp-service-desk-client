import {
  CATEGOTY_FETCHING,
  CATEGOTY_REQUEST_SENDD,
  CATEGOTY_REQUEST_SUCCESSED,
} from '../constants';

export const categoryFetching = () => ({
  type: CATEGOTY_FETCHING,
});
export const categoryRequestSendd = () => ({
  type: CATEGOTY_REQUEST_SENDD,
});
export const categoryRequestSuccessed = (data) => ({
  type: CATEGOTY_REQUEST_SUCCESSED,
  data,
});
