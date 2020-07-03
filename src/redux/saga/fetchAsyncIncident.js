import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { incidentRequestSendd, incidentCreate } from '../actionCreators/incidentAction';
import { errorCreate } from '../actionCreators/errorAction';
import { socket } from '../../index';

export function* fetchAsyncIncident({ data, dataFile }) {
  try {
    let PORT = window.location.protocol === 'http:' ? '8080' : '8433';

    yield put(incidentRequestSendd());
    const newIncident = yield call(() =>
      axios.post(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}/api/incidents`, data).then((res) => {
        socket.emit('newIncident', res.data);
        return res.data;
      }),
    );
    if (dataFile.wasFile) {
      let bindFileIncident = {
        name: dataFile.filename,
        url: dataFile.url,
        userNumber: newIncident.userNumber,
        incidentId: newIncident.id,
      };
      yield call(() =>
        axios.post(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}/api/files`, bindFileIncident),
      );
    }

    yield put(incidentCreate());
  } catch (error) {
    console.error(error.message);
    yield put(errorCreate(error.message));
  }
}
