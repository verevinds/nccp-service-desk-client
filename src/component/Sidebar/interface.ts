export interface TList {
  id: number | undefined;
  name: string | undefined;
  createdAt: string | undefined;
  status: string | undefined;
  responsible: string | undefined;
}
export interface ISidebar {
  list: TList[];
  onClick: () => undefined;
  activeId: number;
}
export interface ISidebarHistory {
  onClick: () => undefined;
  onClickHistory: () => void;
  activeId: number;
}
export interface ISidebarWrapper {
  title: string;
  badge: boolean;
  onClickHistory: () => void;
  list: TList[] | never[];
  onClick: () => undefined;
  isLoading: boolean;
  activeId: number;
}
