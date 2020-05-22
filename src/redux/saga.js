import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as axios from 'axios';
import {
  AUTH_FETCHING,
  CATALOG_FETCHING,
  CATALOG_POST,
  INCIDENT_FETCHING,
  QUERY_API,
} from './constants';
import {
  authRequestSendd,
  authRequestSuccessed,
} from './actionCreators/authAction';
import {
  categoryFetching,
  categoryRequestSendd,
  categoryRequestSuccessed,
} from './actionCreators/catalogAction';
import {
  incidentRequestSendd,
  incidentRequestSuccessed,
  incidentCreate,
} from './actionCreators/incidentAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
  yield takeLatest(CATALOG_FETCHING, fetchAsyncCatalog);
  yield takeEvery(CATALOG_POST, catalogPost);
  yield takeEvery(QUERY_API, queryApiAsync);
  yield takeEvery(INCIDENT_FETCHING, fetchAsyncIncident);
}
const URL = 'http://192.168.213.77/';
function* queryApiAsync({
  route,
  actionSuccessed,
  actionUpdate,
  method,
  data = {},
  id,
  params,
}) {
  try {
    // yield put(authRequestSendd());
    let response;
    if (params) {
      Object.assign(data, { params });
    }
    // console.group(route);
    // console.dir('actionSuccessed', actionSuccessed);
    // console.dir('actionUpdate', actionUpdate);
    // console.log('method', method);
    // console.log('data', data);
    // console.log('id', id);
    // console.log('params', params);
    // console.groupEnd();
    switch (method) {
      case 'post':
        response = yield call(() => axios.post(`api/${route}`, data));
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      case 'delete':
        response = yield call(() => axios.delete(`api/${route}/${id}`, data));
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      case 'put':
        response = yield call(() => axios.put(`api/${route}/${id}`, data));
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      default:
        response = yield call(() => axios.get(`api/${route}/`, data));
        // console.log(`api/${route}/`, data);
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
    }
    if (!!actionSuccessed) {
      yield put(actionSuccessed(response.data));
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchAsync({ ip }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() => axios.get(`api/auth/?ip=${ip}`));
    yield put(authRequestSuccessed(response.data[0]));
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchAsyncCatalog() {
  try {
    yield put(categoryRequestSendd());
    const response = yield call(() => axios.get(`api/categories`));
    yield put(categoryRequestSuccessed(response.data));
  } catch (error) {
    console.log(error.message);
  }
}
function* fetchAsyncIncident({ route, method, data, id }) {
  try {
    yield put(incidentRequestSendd());
    switch (method) {
      case 'post':
        yield call(() => axios.post(`api/${route}`, data));
        yield put(incidentCreate());
        break;
      case 'delete':
        yield call(() => axios.delete(`api/${route}/${id}`, data));
        yield put(incidentCreate());
        break;
      case 'put':
        yield call(() => axios.put(`api/${route}/${id}`, data));
        yield put(incidentCreate());
        break;
      case 'get':
        const response = yield call(() => axios.get(`api/incidents`));
        yield put(incidentRequestSuccessed(response.data));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
  }
}
function* catalogPost({ route, method, data, id }) {
  try {
    yield put(authRequestSendd());
    switch (method) {
      case 'post':
        yield call(() => axios.post(`api/${route}`, data));
        break;
      case 'delete':
        yield call(() => axios.delete(`api/${route}/${id}`, data));
        break;

      default:
        break;
    }
    yield put(categoryFetching());
  } catch (error) {
    console.log(error.message);
  }
}
