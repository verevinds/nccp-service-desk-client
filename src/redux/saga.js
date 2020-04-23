import { put, call, takeLatest } from 'redux-saga/effects';
import * as axios from 'axios';
import { AUTH_FETCHING } from './constants';
import {
  authRequestSendd,
  authRequestSuccessed,
} from './actionCreators/authAction';

export function* watchFetch() {
  yield takeLatest(AUTH_FETCHING, fetchAsync);
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
