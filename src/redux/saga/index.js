import { INCIDENT_FETCHING, QUERY_API, FILE_FETCHING, AUTH_INITIAL_APP } from '../constants';
import { takeEvery } from 'redux-saga/effects';

import { fetchAsyncFile } from './fetchAsyncFile';
import { queryApiAsync } from './queryApiAsync';
import { fetchAsyncIncident } from './fetchAsyncIncident';
import { fetchAuthInitialApp } from './fetchAuthInitialApp';

export function* watchFetch() {
  yield takeEvery(QUERY_API, queryApiAsync);
  yield takeEvery(INCIDENT_FETCHING, fetchAsyncIncident);
  yield takeEvery(FILE_FETCHING, fetchAsyncFile);
  yield takeEvery(AUTH_INITIAL_APP, fetchAuthInitialApp);
}
