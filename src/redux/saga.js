import { put, call, takeLatest } from 'redux-saga/effects';
import * as axios from 'axios';
import { AUTH_FETCHING, CATEGORY_FETCHING, CATALOG_POST } from './constants';
import {
  authRequestSendd,
  authRequestSuccessed,
} from './actionCreators/authAction';
import {
  categoryFetching,
  categoryRequestSendd,
  categoryRequestSuccessed,
} from './actionCreators/categoryAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
  yield takeLatest(CATEGORY_FETCHING, fetchAsyncCategory);
  yield takeLatest(CATALOG_POST, catalogPost);
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

function* fetchAsyncCategory() {
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
