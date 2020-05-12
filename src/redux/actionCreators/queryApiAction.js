import { QUERY_API } from '../constants';

export const queryApi = (route, successedAction, method, data, id) => ({
  type: QUERY_API,
  route,
  successedAction,
  data,
  id,
  method,
});
