import React from 'react';
import { TIncident, TIncidents } from '../../interface';

export interface IIncidentContext {
  params?: object;
  myIncident?: boolean;
  title?: string;
  actionSuccessed?: () => void;
  requestSuccessed?: () => void;
}
export const IncidentContext = React.createContext<IIncidentContext>({});
