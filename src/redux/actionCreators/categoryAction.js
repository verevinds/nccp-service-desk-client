import {
  CATEGORY_FETCHING,
  CATEGORY_REQUEST_SENDD,
  CATEGORY_REQUEST_SUCCESSED,
  CATEGORY_POST,
} from '../constants';

export const categoryFetching = () => ({
  type: CATEGORY_FETCHING,
});
export const categoryRequestSendd = () => ({
  type: CATEGORY_REQUEST_SENDD,
});
export const categoryRequestSuccessed = (data) => ({
  type: CATEGORY_REQUEST_SUCCESSED,
  data,
});
export const categorySend = (data) => ({
  type: CATEGORY_POST,
  data,
});
