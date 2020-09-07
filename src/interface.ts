export interface IState {
  access: TAccess;
  auth: TAuth;
  catalog: TCatalog;
  error: string | null;
  incidents: TIncidents;
  progress: TProgress;
  positions: IPositions;
  status: TStatusies;
  users: TUsers;
  subscription: {
    list?: ISubscription[];
    isLoading: boolean;
    isUpdate: boolean;
  };
  responsible: IResponsible;
  setting: any;
  resources: IResource;
  filter: any;
  groups: IGroups;
}

export interface IGroups {
  list: (never | TGroup)[];
  isLoading: boolean;
  isUpdate: boolean;
}
export type TGroup = {
  id: number;
  name: string;
  isArchive: boolean;
  updatedAt: string;
  createdAt: string;
  users: TGroupList[];
  properties: TGroupProperty[];
};
export type TGroupProperty = {
  id: number;
  groupId: number;
  categoryId: null | number;
  propertyId: null | number;
  optionId: null | number;
  createdAt: string;
  updatedAt: string;
};
export type TGroupList = {
  id: number;
  groupId: number;
  userNumber: number;
  createdAt: string;
  updatedAt: string;
  user: TUser;
};
export interface IResource {
  isUpdate: boolean;
  list?: TResource[];
}
export type TResource = {
  id: number;
  name: string;
  holderId: number;
  creatorId: number;
  creatorPositionId: number;
  creatorDepartmentId: number;
  isArchive: null | boolean;
  createdAt: string;
  updatedAt: string;
  creatorDepartment: {
    name: string;
    parent: null | number;
  };
  creatorPosition: {
    name: string;
    parent: null | number;
  };
  creator: TUser;
  bind: any;
};
export interface IPositions {
  isUpdate: boolean;
  isLoading: boolean;
  list: (TPosition | never)[];
}
export type TPosition = {
  id: number;
  level: number;
  parent: number | null;
  name: string;
  updatedAt: string;
  createdAt: string;
  responsibles: TResponsible[];
};

/** Инциденты */
export type TIncidents = {
  current: TIncidentCurrent;
  history: TIncident[] | never[];
  isLoading: boolean;
  isRequest: boolean;
  isUpdate: boolean;
  list: (TIncident | never)[];
  allowToCreate: (TIncident | never)[];
  myList: TIncident[] | never[];
  visa: (TIncident | never)[];
};
export type TIncidentCurrent = {
  incident: TIncident;
  isChange: boolean;
};
export type TIncident = {
  [key: string]: any;
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
  finishWork: string | null;
  doneWork: string | null;
  statusId: number;
  text: string;
  updatedAt: string;
  userNumber: number;
  matches: (TMatch | never)[];
  initiatorDepartmentParent: number;
  initiatorDepartment: number;
  hasVisa: boolean;
  rulesId: number | null;
  rules_lists: TRulesList[];
  receiveAt: string | null;
  allowToCreateWork: string | null;
  allowToCreate: boolean;
};
export type TRulesList = {
  hasVisa: boolean;
  userNumber: number | null;
  position: {
    id: number;
    users: TRulesListPositionUser[];
  } | null;
  user: TUser | null;
};
export type TRulesListPositionUser = {
  number: number;
  name1: string;
  name2: string;
  name3: string;
  fired: number;
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
  isUpdate: boolean;

  user: TUser;
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
  options: (TOption | never)[];
  properties: (TProperty | never)[];
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
  title?: string;
  placeholder?: string;
  type?: TTypeInput;
  required?: boolean;
  description?: string;
  parent?: string;
  select: 'departments' | 'users' | 'resources' | string;
  value?: any;
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
  isLoading: boolean;
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
  current: { user?: TUser; isUpdate: boolean };
  isUpdate: boolean;
  list: (TUser | never)[];
};

export type TUser = {
  accesses: any[];
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
  department: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  position: TPosition;
};
export interface ISubscription {
  id: number;
  userNumber: number;
  code: number;
  name: string;
  params: null | any[];
  departmentId: number | null;
  categoryId: number | null;
  positionId: number | null;
  optionId: number | null;
  updatedAt: string;
  createdAt: string;
}
export type TResponsible = {
  id?: number;
  departmentId: number;
  isArchive: null | boolean;
  positionId: null | number;
  userNumber: null | number;
  categoryId: null | number;
  propertyId: null | number;
  optionId: null | number;
};
export interface IResponsible {
  list?: TResponsible[];
  isLoading: boolean;
  isUpdate: boolean;
}
export type TPropsParams = {
  match: {
    params: { id: number };
    isExact: boolean;
    path: string;
    url: string;
  };
};
