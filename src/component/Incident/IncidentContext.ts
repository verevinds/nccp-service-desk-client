import React from 'react';

export interface IIncidentContext {
  params?: object;
  myIncident?: boolean;
  title?: string;
  actionSuccessed?: () => void;
  requestSuccessed?: () => void;
  Buttons?: React.NamedExoticComponent<any>;
  match?: any;
}
export const IncidentContext = React.createContext<IIncidentContext>({});
