import React from 'react';

export interface IIncidentWindowContext {
  handleVise?: { vise: boolean; setVise: any };
  buttons?: any;
}

export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({});
