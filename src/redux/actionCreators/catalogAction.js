import { CATALOG_POST } from '../constants';

export const catalogPost = (route, method, data, id) => ({
  type: CATALOG_POST,
  method,
  route,
  data,
  id,
});
