import { QUERY_API } from '../constants';

export const queryApi = ({
  route,
  actionSuccessed,
  actionUpdate,
  method,
  data,
  id,
  params,
}) => ({
  type: QUERY_API,
  route,
  actionSuccessed,
  actionUpdate,
  data,
  id,
  method,
  params,
});
