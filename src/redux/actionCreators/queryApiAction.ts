import { QUERY_API } from '../constants';

interface IQueryApi {
  route: string | undefined;
  actionSuccessed?: (type: string, data: any) => void;
  actionUpdate?: (type: string, data: any) => void;
  method?: string | undefined;
  data?: any;
  id?: number | undefined;
  params?: {};
}

export const queryApi = ({
  route,
  actionSuccessed,
  actionUpdate,
  method,
  data,
  id,
  params,
}: IQueryApi) => ({
  type: QUERY_API,
  route,
  actionSuccessed,
  actionUpdate,
  data,
  id,
  method,
  params,
});
