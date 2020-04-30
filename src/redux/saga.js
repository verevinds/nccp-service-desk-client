import { put, call, takeLatest } from 'redux-saga/effects';
import * as axios from 'axios';
import {
  AUTH_FETCHING,
  CATALOG_FETCHING,
  CATALOG_POST,
  INCIDENT_FETCHING,
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
  incidentFetching,
  incidentRequestSendd,
  incidentRequestSuccessed,
} from './actionCreators/incidentAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
  yield takeLatest(CATALOG_FETCHING, fetchAsyncCatalog);
  yield takeLatest(CATALOG_POST, catalogPost);
  yield takeLatest(INCIDENT_FETCHING, fetchAsyncIncident);
}

function* fetchAsync({ ip }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() =>
      axios.get(`http://localhost:8080/api/auth/?ip=${ip}`),
    );
    yield put(authRequestSuccessed(response.data[0]));
  } catch (error) {
    console.log(error.message);
  }
}

function* fetchAsyncCatalog() {
  try {
    yield put(categoryRequestSendd());
    const response = yield call(() =>
      axios.get(`http://localhost:8080/api/categories`),
    );
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
        yield call(() =>
          axios.post(`http://localhost:8080/api/${route}`, data),
        );
        yield put(incidentFetching());
        break;
      case 'delete':
        yield call(() =>
          axios.delete(`http://localhost:8080/api/${route}/${id}`, data),
        );
        yield put(incidentFetching());
        break;
      case 'get':
        const response = yield call(() =>
          axios.get(`http://localhost:8080/api/incidents`),
        );
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
        yield call(() =>
          axios.post(`http://localhost:8080/api/${route}`, data),
        );
        break;
      case 'delete':
        yield call(() =>
          axios.delete(`http://localhost:8080/api/${route}/${id}`, data),
        );
        break;

      default:
        break;
    }
    yield put(categoryFetching());
  } catch (error) {
    console.log(error.message);
  }
}
