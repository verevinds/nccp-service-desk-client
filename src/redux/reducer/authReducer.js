import { AUTH_REQUEST_SENDD, AUTH_REQUEST_SUCCESSED } from '../constants';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  isRequest: false,
  isLoading: false,
  isUpdate: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
        isUpdate: false,
      };
    case AUTH_REQUEST_SUCCESSED:
      if (action.data[0] !== 'Error') {
        return {
          ...state,
          user: action.data,
          isLoading: true,
          isRequest: false,
          isUpdate: false,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
