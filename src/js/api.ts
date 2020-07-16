import { TUser, TIncident } from './../interface';
import { queryApi } from '../redux/actionCreators/queryApiAction';
import {
  incidentRequestSuccessed,
  myIncidentRequestSuccessed,
  incidentAllowToCreateRequestSuccessed,
  incidentVisaRequestSuccessed,
  incidentCreate,
} from '../redux/actionCreators/incidentAction';
import { paramsIncident } from './paramsIncident';
import { departmentRequestSuccessed } from '../redux/actionCreators/departmentAction';
import { categoryRequestSuccessed } from '../redux/actionCreators/catalogAction';
import { positionsRequestSeccessed } from '../redux/actionCreators/positionAction';
import { statusRequestSeccessed } from '../redux/actionCreators/statusAction';
import { accessRequestSeccessed } from '../redux/actionCreators/accessAction';
import { usersRequestSeccessed } from '../redux/actionCreators/usersAction';

interface IMethod {
  get(id?: number | undefined): void;
  post({ data, params }: { data?: any; params?: any }): void;
  put(id: number, { data, params }: { data?: any; params?: any }): void;
}
function method(this: any, dispatch: any) {
  let { route, actionSuccessed, actionUpdate, params } = this;
  const paramQuery = { route };
  const paramQueryBind = (arg: any) =>
    !!Object.values(arg)[0] && Object.assign(paramQuery, { [Object.keys(arg)[0]]: Object.values(arg)[0] });
  paramQueryBind({ actionSuccessed });
  paramQueryBind({ actionUpdate });
  paramQueryBind({ params });
  console.log('paramQuery this', this);
  const bindData = this.data;
  return {
    get(id?: number) {
      paramQueryBind({ id });

      dispatch(queryApi(paramQuery));
      console.log('paramQuery', paramQuery);
    },
    post({ data, params }: { data?: any; params?: any }) {
      paramQueryBind({ params });
      paramQueryBind({ data: { ...data, ...bindData } });
      paramQueryBind({ method: 'post' });
      dispatch(queryApi(paramQuery));
      console.log('paramQuery', paramQuery);
    },
    put(id: number, { data, params }: { data?: any; params?: any }) {
      paramQueryBind({ id });
      paramQueryBind({ params });
      paramQueryBind({ data: { ...data, ...bindData } });
      paramQueryBind({ method: 'put' });
      dispatch(queryApi(paramQuery));
      console.log('paramQuery', paramQuery);
    },
  };
}

function api(dispatch: any, user?: TUser) {
  type IActionSuccessed = (data: any) => { type: string; data: any };
  type IActionUpdate = () => { type: string };
  function createRoute(
    this: any,
    route: string,
    action?: {
      actionSuccessed?: IActionSuccessed;
      actionUpdate?: IActionUpdate;
    },
    dataQuery?: { data?: any; params?: any },
  ) {
    this.route = route;
    if (dataQuery) {
      const { data, params } = dataQuery;

      this.params = !!params ? params : undefined;
      this.data = !!data ? data : undefined;
    }
    if (!!action) {
      const { actionSuccessed, actionUpdate } = action;

      this.actionSuccessed = !!actionSuccessed ? actionSuccessed : undefined;
      this.actionUpdate = !!actionUpdate ? actionUpdate : undefined;
    }

    return method.call(this, dispatch);
  }

  const api: IApi = {
    incidents() {
      return {
        work: () =>
          createRoute.call(
            this,
            'incidents/work',
            { actionSuccessed: incidentRequestSuccessed },
            { params: paramsIncident(user) },
          ),
        department: () =>
          createRoute.call(
            this,
            'incidents/department',
            { actionSuccessed: incidentAllowToCreateRequestSuccessed },
            {
              params: {
                departmentId: user?.departmentId,
                allowToCreate: false,
              },
            },
          ),
        my: () =>
          createRoute.call(
            this,
            'incidents/my',
            { actionSuccessed: myIncidentRequestSuccessed },
            { params: { userNumber: user?.number } },
          ),
        visa: () =>
          createRoute.call(
            this,
            'incidents/visa',
            { actionSuccessed: incidentVisaRequestSuccessed },
            { params: { hasVisa: false, positionId: user?.positionId } },
          ),
        ...createRoute.call(this, 'incidents', { actionUpdate: incidentCreate }),
      };
    },
    catalogs() {
      const actions = { actionSuccessed: departmentRequestSuccessed };
      return createRoute.call(this, 'catalogs', actions);
    },
    categories() {
      const actions = { actionSuccessed: categoryRequestSuccessed };
      return createRoute.call(this, 'categories', actions);
    },
    positions() {
      const actions = { actionSuccessed: positionsRequestSeccessed };
      return createRoute.call(this, 'positions', actions);
    },
    status() {
      const actions = { actionSuccessed: statusRequestSeccessed };
      return createRoute.call(this, 'status', actions);
    },
    access() {
      const actions = { actionSuccessed: accessRequestSeccessed };
      return createRoute.call(this, 'access', actions);
    },
    users() {
      const actions = { actionSuccessed: usersRequestSeccessed };
      return createRoute.call(this, 'users', actions);
    },
    matches() {
      return createRoute.call(this, 'matches');
    },
    comments() {
      const actions = { actionUpdate: incidentCreate };
      const data = { userNumber: user?.number };
      return createRoute.call(this, 'comments', actions, { data });
    },
  };

  return api;
}

export default api;

export interface IApi {
  incidents(): {
    work: (user: TUser) => IMethod;
    department: (user: TUser) => IMethod;
    my: (user: TUser) => IMethod;
    visa: (user: TUser) => IMethod;
    get(id?: number | undefined): void;
    post({ data, params }: { data?: any; params?: any }): void;
    put(id: number, { data, params }: { data?: any; params?: any }): void;
  };
  catalogs(): IMethod;
  categories(): IMethod;
  positions(): IMethod;
  status(): IMethod;
  access(): IMethod;
  users(): IMethod;
  matches(): IMethod;
  comments(): IMethod;
}
