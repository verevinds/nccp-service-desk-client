import React from 'react';

export interface IAppContext {
  apiDispatch?: any;
}

export const AppContext = React.createContext<IAppContext>({});
