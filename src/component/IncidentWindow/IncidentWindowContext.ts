import React from 'react';

export interface IIncidentWindowContext {
  onClick: () => void;
  handleVise?: { vise: boolean; setVise: any };
}
export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({ onClick: () => {} });
