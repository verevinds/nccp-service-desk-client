import { TIncident } from './../../interface';
export interface TList {
  id: number;
  name: string;
  createdAt: string;
  responsible: any;
  numberResponsible: number | null;
  consent: number | null;
  status: number;
  finishWork: string | null;
  startWork: string | null;
  doneWork: string | null;
  categories: number;
  options: number | null;
  properties: number | null;
}
export interface ISidebar {
  list: TIncident[];
  filter?: any;
  onClick: (id: any) => void;
  activeId?: number;
}
export interface ISidebarHistory {
  onClick: (id: any) => void;
  onClickHistory: () => void;
  activeId?: number;
}
export interface ISidebarWrapper {
  title?: string;
  badge?: boolean;
  onClickHistory?: () => void;
  list: (TIncident | never)[];
  onClick: (id: any) => void;
  isLoading?: boolean;
  activeId?: number;
}
