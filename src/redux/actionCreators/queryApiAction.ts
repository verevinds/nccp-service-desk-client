import { QUERY_API } from '../constants';

export interface IQueryApi {
  route?: string;
  actionSuccessed?: (type: string, data: any) => void;
  actionUpdate?: (type: string, data: any) => void;
  method?: 'post' | 'delete' | 'put' | string;
  data?: any;
  id?: number;
  params?: {};
  userNumber?: number;
}

export const queryApi = ({
  route,
  actionSuccessed,
  actionUpdate,
  method,
  data,
  id,
  params,
  userNumber,
}: IQueryApi) => ({
  type: QUERY_API,
  route,
  actionSuccessed,
  actionUpdate,
  data,
  id,
  method,
  params,
  userNumber,
});
