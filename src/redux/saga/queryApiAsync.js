import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { errorCreate } from '../actionCreators/errorAction';
import { socket } from '../../index';

export function* queryApiAsync({ route, actionSuccessed, actionUpdate, method, data = {}, id, params, userNumber }) {
  try {
    let response;

    let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
    const URL = `${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}`;
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
        break;

      case 'delete':
        response = yield call(() => axios.delete(`${URL}/api/${route}/${id || ''}`, data));
        break;

      case 'put':
        response = yield call(() => axios.put(`${URL}/api/${route}/${id}`, data));
        if (response.status === 200 && 'incidents') {
          socket.emit('incidentUpdate', { id, data, userNumber });
        }
        break;

      default:
        response = yield call(() => axios.get(`${URL}/api/${route}/${id || ''}`, data));
        break;
    }

    if (!!actionUpdate) {
      yield put(actionUpdate());
    }

    if (!!actionSuccessed) {
      yield put(actionSuccessed(response.data));
      localStorage.setItem(route, JSON.stringify(response.data));
    }

    return response;
  } catch (error) {
    console.error(error.message);
    yield put(errorCreate(error.message));
  }
}
