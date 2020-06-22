import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { errorCreate } from '../actionCreators/errorAction';

export function* queryApiAsync({ route, actionSuccessed, actionUpdate, method, data = {}, id, params }) {
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
        response = yield call(() => axios.post(`https://srv-sdesk.c31.nccp.ru:8443/api/${route}`, data));
        break;

      case 'delete':
        response = yield call(() => axios.delete(`https://srv-sdesk.c31.nccp.ru:8443/api/${route}/${id || ''}`, data));
        break;

      case 'put':
        response = yield call(() => axios.put(`https://srv-sdesk.c31.nccp.ru:8443/api/${route}/${id}`, data));
        break;

      default:
        response = yield call(() => axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/${route}/${id || ''}`, data));
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