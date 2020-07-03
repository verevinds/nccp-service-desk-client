import React from 'react';

export interface IIncidentWindowContext {
  handleVise?: { vise: boolean; setVise: any };
  dispatchQueryApi?: IDispatchQueryApi;
}
export interface IDispatchQueryApi {
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

export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({});
