import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { incidentCreate } from '../actionCreators/incidentAction';
import { fileRequestSendd, fileRequestSuccessed } from '../actionCreators/fileAction';
import { queryApi } from '../actionCreators/queryApiAction';
import { errorCreate } from '../actionCreators/errorAction';

export function* fetchAsyncFile({ file, incidentId, userNumber }) {
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
      let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
      response = yield call(() =>
        axios
          .post(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}/api/files`, bindFileIncident)
          .then((res) => res),
      );
    }
    if (response && response.statusText === 'OK') {
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
    console.error(error.message);
    yield put(errorCreate(error.message));
  }
}
