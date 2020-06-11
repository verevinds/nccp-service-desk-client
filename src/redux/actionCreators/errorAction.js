import { ERROR_CREATE } from '../constants';

export const errorCreate = (error) => ({ type: ERROR_CREATE, error });
