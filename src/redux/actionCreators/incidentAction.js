import {
  INCIDENT_FETCHING,
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
  MY_INCIDENT_REQUEST_SUCCESSED,
  INCIDENT_CHOOSE,
  INCIDENT_CREATE,
} from '../constants';

export const incidentFetching = (
  method = 'get',
  data,
  id,
  route = 'incidents',
) => ({
  type: INCIDENT_FETCHING,
  route,
  method,
  data,
  id,
});
export const incidentRequestSendd = () => ({
  type: INCIDENT_REQUEST_SENDD,
});
export const incidentRequestSuccessed = (data) => ({
  type: INCIDENT_REQUEST_SUCCESSED,
  data,
});
export const myIncidentRequestSuccessed = (data) => ({
  type: MY_INCIDENT_REQUEST_SUCCESSED,
  data,
});
export const incidentCreate = () => ({ type: INCIDENT_CREATE });
export const incidentChoose = (incident) => ({
  type: INCIDENT_CHOOSE,
  incident,
});
