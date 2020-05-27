import { PROGRESS_FINISH, PROGRESS_STEP, PROGRESS_START } from '../constants';

const initialState = {
  isStart: false,
  isFinish: true,
  now: 0,
};

export const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRESS_START:
      return {
        now: 0,
        isStart: true,
        isFinish: false,
      };

    case PROGRESS_STEP:
      return {
        ...state,
        now: Number(Number(state.now) + Number(action.step)),
      };

    case PROGRESS_FINISH:
      return {
        now: 100,
        isStart: false,
        isFinish: true,
      };

    default:
      return state;
  }
};
