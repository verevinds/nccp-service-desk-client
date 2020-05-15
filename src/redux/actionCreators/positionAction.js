import { POSITIONS_REQUEST_SUCCESSED, POSITIONS_UPDATE } from '../constants';

export const positionsUpdate = () => ({ type: POSITIONS_UPDATE });
export const positionsRequestSeccessed = (data) => ({
  type: POSITIONS_REQUEST_SUCCESSED,
  data,
});
