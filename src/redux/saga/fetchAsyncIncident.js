import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { incidentRequestSendd, incidentCreate } from '../actionCreators/incidentAction';
import { errorCreate } from '../actionCreators/errorAction';
import openSocket from 'socket.io-client';

export function* fetchAsyncIncident({ data, dataFile }) {
  try {
    const socket = openSocket('https://srv-sdesk.c31.nccp.ru:8000');

    yield put(incidentRequestSendd());
    const newIncident = yield call(() =>
      axios.post(`https://srv-sdesk.c31.nccp.ru:8443/api/incidents`, data).then((res) => {
        socket.emit('newIncident', res.data);
      }),
    );
    if (dataFile.wasFile) {
      let bindFileIncident = {
        name: dataFile.filename,
        url: dataFile.url,
        userNumber: newIncident.data.userNumber,
        incidentId: newIncident.data.id,
      };
      yield call(() => axios.post(`https://srv-sdesk.c31.nccp.ru:8443/api/files`, bindFileIncident));
    }

    yield put(incidentCreate());
  } catch (error) {
    console.log(error.message);
    yield put(errorCreate(error.message));
  }
}
