import { AUTH_REQUEST_SENDD, AUTH_REQUEST_SUCCESSED } from '../constants';

const initialState = {
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
      const {
        data: { user },
      } = action;
      return {
        ...state,
        user,
        isLoading: true,
        isRequest: false,
      };
    default:
      return state;
  }
};
