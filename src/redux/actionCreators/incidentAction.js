import {
  INCIDENT_FETCHING,
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
} from '../constants';

export const incidentFetching = (route, method, data) => ({
  type: INCIDENT_FETCHING,
  route,
  method,
  data,
});
export const incidentRequestSendd = () => ({
  type: INCIDENT_REQUEST_SENDD,
});
export const incidentRequestSuccessed = (data) => ({
  type: INCIDENT_REQUEST_SUCCESSED,
  data,
});
