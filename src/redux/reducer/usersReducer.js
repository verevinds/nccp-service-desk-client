import {
  USERS_REQUEST_SUCCESSED,
  USERS_UPDATE,
  USERS_CURRENT_REQUEST_SUCCESSED,
  USERS_CURRENT_UPDATE,
} from '../constants';

const initialState = {
  list: [],
  current: {
    user: undefined,
    isUpdate: false,
  },
  isUpdate: true,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isUpdate: false,
      };
    case USERS_CURRENT_REQUEST_SUCCESSED:
      return {
        ...state,
        current: { ...state.current, user: action.data[0], isUpdate: false },
      };
    case USERS_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    case USERS_CURRENT_UPDATE:
      return {
        ...state,
        current: { ...state.current, isUpdate: true },
      };
    default:
      return state;
  }
};
