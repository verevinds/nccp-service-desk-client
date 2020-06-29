export interface IState {
  access: TAccess;
  auth: TAuth;
  catalog: TCatalog;
  error: string | null;
  incidents: TIncidents;
  progress: TProgress;
  status: TStatusies;
  users: TUsers;
}

/** Инциденты */
export type TIncidents = {
  current: TIncidentCurrent;
  history: TIncident[] | never[];
  isLoading: boolean;
  isRequest: boolean;
  isUpdate: boolean;
  list: TIncident[] | never[];
  myList: TIncident[] | never[];
};
export type TIncidentCurrent = {
  incident: TIncident;
  isChange: boolean;
};
export type TIncident = {
  category: { departmentId: number; name: string; level: number | null };
  categoryId: number;
  comments: IComment[] | never[];
  consent: number | null;
  createdAt: string;
  currentResponsible: number | null;
  department: { name: string };
  departmentId: number | null;
  files: (IFile | never)[];
  id: number;
  initiatorUser: TUser;
  isArchive: false;
  params: TPropertyParam[][] | null;
  level: number;
  option: TOption;
  optionId: number | null;
  positionId: number | null;
  property: TProperty;
  propertyId: number | null;
  responsibleUser: TUser | null;
  startWork: string | null;
  statusId: number;
  text: string;
  updatedAt: string;
  userNumber: number;
  matches: (TMatch | never)[];
};
export type TMatch = {
  isMatch: false;
  id: number;
  incidentId: number;
  code: number;
  params: object;
};
export interface IComment extends TDependUserAndIncident {
  text: string;
}
export interface IFile extends TDependUserAndIncident {
  url: string;
  name: string;
}
export type TDependUserAndIncident = {
  createdAt: string;
  id: number;
  incidentId: number;
  updatedAt: string;
  user: TUser;
  userNumber: number;
};
/** Доступ */
export type TAccess = {
  isAccess: number;
  isUpdate: boolean;
};
/** Авторизация */
export type TAuth = {
  isLoading: boolean;
  isRequest: boolean;
  user: TUser;
};
export type TUser = {
  computer: string;
  createdAt: string;
  departmentId: number;
  dob: string;
  email: string;
  exmail: string;
  fired: number;
  login: string | null;
  name1: string;
  name2: string;
  name3: string;
  number: number;
  phone1: string;
  phone2: string;
  photo: string;
  positionId: number;
  sex: number;
  updatedAt: string;
};
/** Каталог */
export type TCatalog = {
  department: TDepartment[] | never[];
  isLoading: boolean;
  isRequest: boolean;
  isUpdate: boolean;
  list: TCategory[] | never[];
};
export type TDepartment = {
  categories: TCategory[] | never[];
  id: number;
  name: string;
};
export type TCategory = {
  deadline: number;
  departmentId: number;
  id: number;
  isArchive: boolean;
  level: number | null;
  name: string;
  options: TOption[] | never[];
  properties: TProperty[] | never[];
};
export type TOption = {
  bind: never[] | TBindOption[];
  categoryId: number;
  deadline: number;
  id: number;
  isArchive: boolean;
  level: number | null;
  name: string;
  params: (never | TPropertyParam)[];
};
export type TBindOption = {
  createdAt: string;
  id: 260;
  isArchive: boolean | null;
  level: number | null;
  name: string | null;
  optionId: number;
  propertyId: number;
  updatedAt: string;
};
export type TProperty = {
  bind: TBindProperty[] | never[];
  categoryId: number | null;
  deadline: number;
  id: number;
  isArchive: boolean;
  level: number | null;
  name: string;
  priorityId: number | null;
  params: (never | TPropertyParam)[][];
};
export type TPropertyParam = {
  title: string;
  placeholder: string;
  type: TTypeInput;
  required: boolean;
  description: string;
  parent: string;
  select: string;
  value: any;
};
export type TTypeInput =
  | 'button'
  | 'checkbox'
  | 'password'
  | 'reset'
  | 'text'
  | 'color'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'month'
  | 'week'
  | 'switch'
  | 'title'
  | 'list'
  | ''
  | string;
export type TBindProperty = {
  id: number;
  item: {
    id: number;
    isArchive: boolean;
    name: string;
  };
};
/** Прогресс */
export type TProgress = {
  isFinish: boolean;
  isStart: boolean;
  now: number;
};
/** Статус */
export type TStatusies = {
  isUpdate: boolean;
  list: TStatus[] | never[];
};
export type TStatus = {
  createdAt: string;
  id: number;
  isArchive: boolean;
  level: number | null;
  name: string;
  noChange: boolean;
  updatedAt: string;
};
/** Пользователи */
export type TUsers = {
  current: { user?: IUserInUsers; isUpdate: boolean };
  isUpdate: boolean;
  list: IUserInUsers[] | never[];
};
export interface IUserInUsers extends TUser {
  accesses: any[];
  department: { id: number; name: string; createdAt: string; updatedAt: string };
  position: { id: number; name: string; level: number; createdAt: string; updatedAt: string };
}
