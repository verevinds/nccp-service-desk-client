import { AUTH_REQUEST_SENDD, AUTH_REQUEST_SUCCESSED } from '../constants';

const initialState = {
  users: [],
  isRequest: false,
  isLoading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case AUTH_REQUEST_SUCCESSED:
      return {
        ...state,
        users: action.data,
        isLoading: true,
        isRequest: false,
      };
    default:
      return state;
  }
};
