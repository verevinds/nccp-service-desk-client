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
  list: TList[];
  filter?: any;
  onClick: (id: any) => void;
  activeId?: number;
  match: any;
}
export interface ISidebarHistory {
  onClick: (id: any) => void;
  onClickHistory: () => void;
  activeId?: number;
}
export interface ISidebarWrapper {
  title: string;
  badge?: boolean;
  onClickHistory: () => void;
  list: (TList | never)[];
  onClick: (id: any) => void;
  isLoading?: boolean;
  activeId?: number;
}
