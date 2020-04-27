import {
  CATEGOTY_REQUEST_SENDD,
  CATEGOTY_REQUEST_SUCCESSED,
} from '../constants';
const initialState = {
  list: [],
  isRequest: false,
  isLoading: true,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGOTY_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case CATEGOTY_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isRequest: false,
      };
    default:
      return state;
  }
};
