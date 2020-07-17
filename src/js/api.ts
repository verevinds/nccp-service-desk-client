import { TUser } from './../interface';
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

function method(this: any, dispatch: any) {
  let { route, actionSuccessed, actionUpdate, params } = this;
  const paramQuery = { route };
  const paramQueryBind = (arg: any) =>
    !!Object.values(arg)[0] && Object.assign(paramQuery, { [Object.keys(arg)[0]]: Object.values(arg)[0] });
  paramQueryBind({ actionSuccessed });
  paramQueryBind({ actionUpdate });
  paramQueryBind({ params });
  const bindData = this.data;
  this.data = undefined;
  this.params = undefined;
  return {
    get: (id?: number) => {
      paramQueryBind({ id });
      console.log('get this', this);

      dispatch(queryApi(paramQuery));
      return { ...this, ...method.call(this, dispatch) };
    },
    post: ({ data, params }: { data?: any; params?: any }) => {
      console.log('post this', this);
      paramQueryBind({ params });
      paramQueryBind({ data: { ...data, ...bindData } });
      paramQueryBind({ method: 'post' });
      dispatch(queryApi(paramQuery));
      return { ...this, ...method.call(this, dispatch) };
    },
    put: (id: number, { data, params }: { data?: any; params?: any }) => {
      console.log('put this', this);
      paramQueryBind({ params });
      paramQueryBind({ data: { ...data, ...bindData } });
      paramQueryBind({ method: 'put' });
      paramQueryBind({ id });
      dispatch(queryApi(paramQuery));
      return { ...this, ...method.call(this, dispatch) };
    },
    delete: (id: number) => {
      paramQueryBind({ id });
      dispatch(queryApi(paramQuery));
      return { ...this, ...method.call(this, dispatch) };
    },
  };
}

function api(dispatch: any) {
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
    const handleAction = (action?: any) => {
      const actionSuccessed = action ? action.actionSuccessed : undefined;
      const actionUpdate = action ? action.actionUpdate : undefined;

      this.actionSuccessed = !!actionSuccessed ? actionSuccessed : undefined;
      this.actionUpdate = !!actionUpdate ? actionUpdate : undefined;

      return this;
    };
    const handleDataQuery = (dataQuery: any) => {
      const data = dataQuery ? dataQuery.data : undefined;
      const params = dataQuery ? dataQuery.params : undefined;

      this.params = !!params ? params : undefined;
      this.data = !!data ? data : undefined;
    };

    this.route = route;
    handleDataQuery(dataQuery);
    handleAction(action);

    return method.call(this, dispatch);
  }

  const api: IApi = {
    incidents() {
      return {
        work: (user?: TUser) =>
          createRoute.call(
            this,
            'incidents/work',
            { actionSuccessed: incidentRequestSuccessed },
            { params: paramsIncident(user) },
          ),
        department: (user?: TUser) =>
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
        my: (user?: TUser) =>
          createRoute.call(
            this,
            'incidents/my',
            { actionSuccessed: myIncidentRequestSuccessed },
            { params: { userNumber: user?.number } },
          ),
        visa: (user?: TUser) =>
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
    comments(userNumber: number, incidentId: number) {
      const actions = { actionUpdate: incidentCreate };
      const data = { userNumber, incidentId };

      return createRoute.call(this, 'comments', actions, { data });
    },
  };

  return api;
}

export default api;

export interface IApi {
  incidents(): IApiIncident;
  catalogs(): IMethod;
  categories(): IMethod;
  positions(): IMethod;
  status(): IMethod;
  access(): IMethod;
  users(): IMethod;
  matches(): IMethodMatches;
  comments(userNumber: number, incidentId: number): IMethodComments;
}
interface IApiIncident extends IMethod {
  work: (user: TUser) => IMethod;
  department: (user: TUser) => IMethod;
  my: (user: TUser) => IMethod;
  visa: (user: TUser) => IMethod;
}
interface IMethod {
  get(id?: number | undefined): any;
  post({ data, params }: { data?: any; params?: any }): any;
  put(id: number, { data, params }: { data?: any; params?: any }): any;
  delete(id: number): any;
}
interface IMethodComments extends IMethod {
  post({ data, params }: { data: { text: string }; params?: any }): any;
}
interface IMethodMatches extends IMethod {
  post({
    data,
    params,
  }: {
    data: {
      code: number;
      incidentId: number;
      params?: {};
    };
    params?: any;
  }): any;
}
