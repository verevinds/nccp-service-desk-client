import {
  DEPARTMENT_FETCHING,
  DEPARTMENT_REQUEST_SENDD,
  DEPARTMENT_REQUEST_SUCCESSED,
} from '../constants';

export const departmentFetching = () => ({
  type: DEPARTMENT_FETCHING,
});
export const departmentRequestSendd = () => ({
  type: DEPARTMENT_REQUEST_SENDD,
});
export const departmentRequestSuccessed = (data) => ({
  type: DEPARTMENT_REQUEST_SUCCESSED,
  data,
});
