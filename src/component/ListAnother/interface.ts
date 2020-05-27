export interface IList {
  title?: string | undefined;
  list: TList[];
  onSubmit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  onFavorites?: () => void | undefined;
  activeId?: number | undefined;
  inputOff?: boolean | undefined;
  pointer?: boolean | undefined;
  xs?: number;
}
export type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange: boolean | undefined;
  level: number | undefined;
};
export interface IListButtonFavorites {
  onFavorites?: () => void;
}
