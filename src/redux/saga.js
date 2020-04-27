import { put, call, takeLatest } from 'redux-saga/effects';
import * as axios from 'axios';
import { AUTH_FETCHING, CATEGOTY_FETCHING } from './constants';
import {
  authRequestSendd,
  authRequestSuccessed,
} from './actionCreators/authAction';
import {
  categoryRequestSendd,
  categoryRequestSuccessed,
} from './actionCreators/categoryAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
  yield takeLatest(CATEGOTY_FETCHING, fetchAsyncCategory);
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
