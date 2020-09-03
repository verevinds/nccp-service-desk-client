import { GROUP_REQUEST_SUCCESSED, GROUP_UPDATE } from '../constants';

export const groupRequestSuccessed = (data) => ({ type: GROUP_REQUEST_SUCCESSED, data });
export const groupUpdate = () => ({ type: GROUP_UPDATE });
