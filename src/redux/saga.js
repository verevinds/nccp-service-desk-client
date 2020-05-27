import { put, call, takeEvery } from 'redux-saga/effects';
import * as axios from 'axios';
import { INCIDENT_FETCHING, QUERY_API, FILE_FETCHING } from './constants';
import {
  incidentRequestSendd,
  incidentCreate,
} from './actionCreators/incidentAction';
import {
  fileRequestSendd,
  fileRequestSuccessed,
} from './actionCreators/fileAction';
import { queryApi } from './actionCreators/queryApiAction';

export function* watchFetch() {
  yield takeEvery(QUERY_API, queryApiAsync);
  yield takeEvery(INCIDENT_FETCHING, fetchAsyncIncident);
  yield takeEvery(FILE_FETCHING, fetchAsyncFile);
}
const URL = 'http://192.168.213.77:8080';

function* fetchAsyncFile({ file, incidentId, userNumber }) {
  try {
    let response;
    yield put(fileRequestSendd());

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
    if (response.statusText === 'OK') {
      const data = {
        text: `Прикреплено вложение: ${response.data?.name}`,
        userNumber,
        incidentId,
      };
      yield put(
        queryApi({
          route: 'comments',
          method: 'post',
          actionUpdate: incidentCreate,
          data,
          id: incidentId,
        }),
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
