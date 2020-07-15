import { TIncident } from './../../interface';
import React from 'react';

export interface IIncidentContext {
  params?: object;
  numberResponsible?: number;
  isMyIncidentsPage?: boolean;
  title?: string;
  actionSuccessed?: () => void;
  requestSuccessed?: () => void;
  Buttons?: React.NamedExoticComponent<any>;
  match?: any;
  incidents?: TIncident[];
}
export const IncidentContext = React.createContext<IIncidentContext>({});
