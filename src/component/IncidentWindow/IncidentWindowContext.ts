import React from 'react';

export interface IIncidentWindowContext {
  handleVise?: { vise: boolean; setVise: any };
}

export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({});
