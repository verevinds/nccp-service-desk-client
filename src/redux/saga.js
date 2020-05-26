import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as axios from 'axios';
import {
  AUTH_FETCHING,
  CATALOG_FETCHING,
  CATALOG_POST,
  INCIDENT_FETCHING,
  QUERY_API,
  FILE_FETCHING,
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
import {
  fileRequestSendd,
  fileRequestSuccessed,
} from './actionCreators/fileAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
  yield takeLatest(CATALOG_FETCHING, fetchAsyncCatalog);
  yield takeEvery(CATALOG_POST, catalogPost);
  yield takeEvery(QUERY_API, queryApiAsync);
  yield takeEvery(INCIDENT_FETCHING, fetchAsyncIncident);
  yield takeEvery(FILE_FETCHING, fetchAsyncFile);
}
const URL = 'http://192.168.213.77:8080';

function* fetchAsyncFile({ file, incidentId, userNumber }) {
  try {
    let response;
    yield put(fileRequestSendd());
    // console.log(file, incidentId, userId);
    if (file.wasFile) {
      let bindFileIncident = {
        name: file.filename,
        url: file.url,
        userNumber,
        incidentId,
      };
      response = yield call(() =>
        axios.post(`${URL}/api/files`, bindFileIncident),
      );
    }

    yield put(fileRequestSuccessed());
  } catch (error) {
    console.log(error.message);
  }
}

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
        response = yield call(() => axios.post(`${URL}/api/${route}`, data));
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      case 'delete':
        response = yield call(() =>
          axios.delete(`${URL}/api/${route}/${id}`, data),
        );
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      case 'put':
        response = yield call(() =>
          axios.put(`${URL}/api/${route}/${id}`, data),
        );
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
      default:
        response = yield call(() =>
          axios.get(`${URL}/api/${route}/${id || ''}`, data),
        );
        // console.log(`${URL}/api/${route}/`, data);
        if (!!actionUpdate) {
          yield put(actionUpdate());
        }
        break;
    }
    if (!!actionSuccessed) {
      yield put(actionSuccessed(response.data));
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchAsync({ ip }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() => axios.get(`${URL}/api/auth/?ip=${ip}`));
    yield put(authRequestSuccessed(response.data[0]));
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchAsyncCatalog() {
  try {
    yield put(categoryRequestSendd());
    const response = yield call(() => axios.get(`${URL}/api/categories`));
    yield put(categoryRequestSuccessed(response.data));
  } catch (error) {
    console.log(error.message);
  }
}
function* fetchAsyncIncident({ data, dataFile }) {
  try {
    yield put(incidentRequestSendd());
    const newIncident = yield call(() =>
      axios.post(`${URL}/api/incidents`, data),
    );

    if (dataFile.wasFile) {
      let bindFileIncident = {
        name: dataFile.filename,
        url: dataFile.url,
        userNumber: newIncident.data.userNumber,
        incidentId: newIncident.data.id,
      };
      yield call(() => axios.post(`${URL}/api/files`, bindFileIncident));
    }

    yield put(incidentCreate());
  } catch (error) {
    console.log(error.message);
  }
}
function* catalogPost({ route, method, data, id }) {
  try {
    yield put(authRequestSendd());
    switch (method) {
      case 'post':
        yield call(() => axios.post(`${URL}/api/${route}`, data));
        break;
      case 'delete':
        yield call(() => axios.delete(`${URL}/api/${route}/${id}`, data));
        break;

      default:
        break;
    }
    yield put(categoryFetching());
  } catch (error) {
    console.log(error.message);
  }
}
