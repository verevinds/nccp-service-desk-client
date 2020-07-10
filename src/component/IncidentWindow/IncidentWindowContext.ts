import React from 'react';

export interface IIncidentWindowContext {
  handleVise?: { vise: boolean; setVise: any };
  handleModify?: any;
  handleOpen?: any;
  buttons?: any;
}

export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({});
