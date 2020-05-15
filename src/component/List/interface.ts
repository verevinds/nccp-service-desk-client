export interface IList {
  title?: string | undefined;
  list?: [
    {
      id: number;
      name: string;
      createdAt: string;
      noChange: boolean | undefined;
      level: number | undefined;
    },
  ];
  onSubmit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  onFavorites?: () => void | undefined;
  activeId?: number | undefined;
  inputOff?: boolean | undefined;
  pointer?: boolean | undefined;
}
export interface IListButtonFavorites {
  onFavorites?: () => void;
}
