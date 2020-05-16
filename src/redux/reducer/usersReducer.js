import { USERS_REQUEST_SUCCESSED, USERS_UPDATE } from '../constants';

const initialState = {
  list: [],
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
    case USERS_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
