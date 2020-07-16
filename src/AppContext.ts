import React from 'react';

export interface IAppContext {
  Api?: IApi;
  apiDispatch?: any;
}
export interface IApi {
  comments: (arg: string) => void;
  incidents: (arg: TProps) => void;
  match: (arg: TProps) => void;
}

type TProps = {
  method?: string;
  route?: string;
  actionSuccessed?: any;
  data?: any;
  params?: any;
  id?: number;
};

export const AppContext = React.createContext<IAppContext>({});
