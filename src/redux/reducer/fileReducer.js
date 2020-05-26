import { FILE_REQUEST_SENDD, FILE_REQUEST_SUCCESSED } from '../constants';

const initialState = {
  isRequest: false,
  isLoading: false,
  file: null,
};

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case FILE_REQUEST_SUCCESSED:
      return {
        ...state,
        file: action.data[0],
        isLoading: true,
        isRequest: false,
      };
    default:
      return state;
  }
};
