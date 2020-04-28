import {
  CATALOG_FETCHING,
  CATALOG_REQUEST_SENDD,
  CATALOG_REQUEST_SUCCESSED,
  CATALOG_POST,
} from '../constants';

export const categoryFetching = () => ({
  type: CATALOG_FETCHING,
});
export const categoryRequestSendd = () => ({
  type: CATALOG_REQUEST_SENDD,
});
export const categoryRequestSuccessed = (data) => ({
  type: CATALOG_REQUEST_SUCCESSED,
  data,
});
export const catalogPost = (route, method, data, id) => ({
  type: CATALOG_POST,
  method,
  route,
  data,
  id,
});
