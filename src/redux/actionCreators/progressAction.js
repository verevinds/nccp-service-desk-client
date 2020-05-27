import { PROGRESS_FINISH, PROGRESS_START, PROGRESS_STEP } from '../constants';

export const progressStart = () => ({ type: PROGRESS_START });
export const progressStep = (step) => ({ type: PROGRESS_STEP, step });
export const progressFinish = () => ({ type: PROGRESS_FINISH });
