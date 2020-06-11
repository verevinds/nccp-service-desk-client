import { ERROR_CREATE } from '../constants';

const initialState = null;

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_CREATE:
      console.log(action);
      return action.error;
    default:
      return state;
  }
};
