import {
  FILE_FETCHING,
  FILE_REQUEST_SENDD,
  FILE_REQUEST_SUCCESSED,
} from '../constants';

export const fileFetching = ({ file, incidentId, userNumber }) => ({
  type: FILE_FETCHING,
  file,
  incidentId,
  userNumber,
});
export const fileRequestSendd = () => ({ type: FILE_REQUEST_SENDD });
export const fileRequestSuccessed = (data) => ({
  type: FILE_REQUEST_SUCCESSED,
  data,
});
