import { RESOURCE_REQUEST_SUCCESSED, RESOURCE_UPDATE } from '../constants';

export const resourceRequestSuccessed = (data) => ({ type: RESOURCE_REQUEST_SUCCESSED, data });
export const resourceUpdate = () => ({ type: RESOURCE_UPDATE });
