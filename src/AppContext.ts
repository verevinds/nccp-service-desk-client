import React from 'react';

export interface IAppContext {
  Api?: IApi;
}
export interface IApi {
  comments: (arg: string) => void;
  incidents: (arg: TProps) => void;
  match: (arg: TProps) => void;
}

type TProps = {
  method?: string;
  data?: any;
  params?: any;
  id?: number;
};

export const AppContext = React.createContext<IAppContext>({});
