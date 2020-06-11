import { AUTH_REQUEST_SENDD, AUTH_REQUEST_SUCCESSED } from '../constants';

const initialState = {
  isRequest: false,
  isLoading: false,
  user: null,
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
      if (action.data[0] !== 'Error') {
        return {
          ...state,
          user: action.data,
          isLoading: true,
          isRequest: false,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
