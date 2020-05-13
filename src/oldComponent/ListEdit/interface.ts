export interface IListEdit {
  title: string;
  list: [{ id: number; name: string; createdAt: string }];
  setNumber: () => void;
  activeId: number;
  actionCreator: () => void;
  route: string;
  onClick: () => void;
  categoryId: number | undefined | null;
  departmentId: number | undefined | null;
  inputOff: boolean;
  actionUpdate: () => void;
}
