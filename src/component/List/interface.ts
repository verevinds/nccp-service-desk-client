export type THandle = {
  onSubmit?: () => void;
  onDelete?: () => void;
  onClick?: (id: number) => void;
  onFavorites?: () => void;
};

export type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange: boolean | undefined;
  level: number | undefined;
};

export interface IList extends THandle {
  title: string;
  xs?: number;
  list: [] | never[];
}

export type IListButtonFavorites = {
  onFavorites?: () => void;
  level: boolean;
};

export interface IListItem extends THandle {
  item: TList;
  activeId?: number;
}
