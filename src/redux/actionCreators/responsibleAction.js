import { RESPONSIBLES_REQUEST_SUCCESSED, RESPONSIBLES_UPDATE } from '../constants';

export const responsibleUpdate = () => ({ type: RESPONSIBLES_UPDATE });
export const responsibleRequestSuccessed = (data) => ({
  type: RESPONSIBLES_REQUEST_SUCCESSED,
  data,
});
