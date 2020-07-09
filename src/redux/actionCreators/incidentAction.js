import {
  INCIDENT_FETCHING,
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
  MY_INCIDENT_REQUEST_SUCCESSED,
  INCIDENT_CHOOSE,
  INCIDENT_CREATE,
  INCIDENT_HISTORY_REQUEST_SUCCESSED,
  INCIDENT_ALLOW_TO_CREATE_REQUEST_SUCCESSED,
  INCIDENT_VISA_REQUEST_SUCCESSED,
} from '../constants';

export const incidentFetching = (data, dataFile) => ({
  type: INCIDENT_FETCHING,
  dataFile,
  data,
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
export const incidentAllowToCreateRequestSuccessed = (data) => ({
  type: INCIDENT_ALLOW_TO_CREATE_REQUEST_SUCCESSED,
  data,
});
export const incidentVisaRequestSuccessed = (data) => ({
  type: INCIDENT_VISA_REQUEST_SUCCESSED,
  data,
});
export const incidentHistoryRequestSuccessed = (data) => ({
  type: INCIDENT_HISTORY_REQUEST_SUCCESSED,
  data,
});
export const incidentCreate = () => ({ type: INCIDENT_CREATE });
export const incidentChoose = (incident) => ({
  type: INCIDENT_CHOOSE,
  incident,
});
