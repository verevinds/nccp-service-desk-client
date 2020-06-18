import React from 'react';

export interface IIncidentWindowContext {
  onClick: () => void;
}
export const IncidentWindowContext = React.createContext<IIncidentWindowContext>({ onClick: () => {} });
