import { put, call, takeLatest } from 'redux-saga/effects';
import * as axios from 'axios';
import {
  AUTH_FETCHING,
  CATEGORY_FETCHING,
  CATEGORY_POST,
  PROPERTY_POST,
  OPTION_POST,
} from './constants';
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
  yield takeLatest(CATEGORY_POST, categoryPost);
  yield takeLatest(PROPERTY_POST, propertyPost);
  yield takeLatest(OPTION_POST, optionPost);
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

function* categoryPost({ data }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() =>
      axios.post(`http://localhost:8080/api/categories`, data),
    );
    yield put(categoryFetching());
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

function* propertyPost({ data }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() =>
      axios.post(`http://localhost:8080/api/properties`, data),
    );
    yield put(categoryFetching());
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

function* optionPost({ data }) {
  try {
    yield put(authRequestSendd());
    const response = yield call(() =>
      axios.post(`http://localhost:8080/api/options`, data),
    );
    yield put(categoryFetching());
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
