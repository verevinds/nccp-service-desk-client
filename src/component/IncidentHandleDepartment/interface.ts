export interface IIncidentHandleDepartment {
  show?: boolean;
  onHide?: (() => void) | undefined;
  currentResponsible?: number | undefined;
}
type TParams = {
  number?: number | null | undefined;
  comment?: string;
  incidentData?: any;
};
export type IDepartment = {
  categories: never[] | [];
  id: number | null;
  name: string;
};
export interface ICategory {
  createdAt: string;
  departmentId: number | null;
  id: number | null;
  name: string;
  options: IOption[];
  properties: IProperty[];
  updatedAt: string;
}
export type IProperty = {
  categoryId: number;
  createdAt: string;
  id: number;
  name: string;
  priorityId: number | null;
  updatedAt: string;
};
export type IOption = {
  categoryId: number;
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};
