import { put, call } from 'redux-saga/effects';
import * as axios from 'axios';
import { incidentRequestSuccessed, myIncidentRequestSuccessed } from '../actionCreators/incidentAction';
import { progressStart, progressFinish, progressStep } from '../actionCreators/progressAction';
import { departmentRequestSuccessed } from '../actionCreators/departmentAction';
import { accessRequestSeccessed } from '../actionCreators/accessAction';
import { categoryRequestSuccessed } from '../actionCreators/catalogAction';
import { statusRequestSeccessed } from '../actionCreators/statusAction';
import { authRequestSuccessed } from '../actionCreators/authAction';
import { errorCreate } from '../actionCreators/errorAction';
import { usersRequestSeccessed } from '../actionCreators/usersAction';

export function* fetchAuthInitialApp({ response }) {
  try {
    if (!!response) yield put(authRequestSuccessed(response));
    yield put(progressStart());
    // Departments
    const departments = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/departments`).then((res) => {
        return res.data;
      }),
    );
    yield localStorage.setItem('departments', JSON.stringify(departments));
    yield put(progressStep(14));
    yield put(departmentRequestSuccessed(departments));

    // Access
    const access = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/access/${response?.number}`).then((res) => {
        return res.data;
      }),
    );
    yield localStorage.setItem('access', JSON.stringify(access));
    yield put(accessRequestSeccessed(access));
    yield put(progressStep(14));

    // Catalog
    const categories = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/categories/`).then((res) => {
        localStorage.setItem('categories', JSON.stringify(res.data));
        return res.data;
      }),
    );
    yield put(categoryRequestSuccessed(categories));
    yield put(progressStep(14));

    // Status
    const status = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/status/`).then((res) => {
        return res.data;
      }),
    );
    yield localStorage.setItem('status', JSON.stringify(status));
    yield put(statusRequestSeccessed(status));
    yield put(progressStep(14));

    // Incidents
    const incidents = yield call(() =>
      axios
        .get(`https://srv-sdesk.c31.nccp.ru:8443/api/incidents/`, { params: { departmentId: response.departmentId } })
        .then((res) => {
          return res.data;
        }),
    );
    yield localStorage.setItem('incidents', JSON.stringify(incidents));
    yield put(incidentRequestSuccessed(incidents));
    yield put(progressStep(15));

    // MY Incidents
    const myIncidents = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/incidents/`, { userNumber: response.number }).then((res) => {
        return res.data;
      }),
    );
    yield localStorage.setItem('myIncidents', JSON.stringify(myIncidents));
    yield put(myIncidentRequestSuccessed(myIncidents));
    yield put(progressStep(15));

    // Users
    const users = yield call(() =>
      axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/users/`).then((res) => {
        return res.data;
      }),
    );
    yield localStorage.setItem('users', JSON.stringify(users));
    yield put(usersRequestSeccessed(users));
    yield put(progressStep(14));

    yield put(progressFinish());
  } catch (error) {
    console.error(error.message);
    yield put(errorCreate(error.message));
    yield put(progressFinish());
  }
}
