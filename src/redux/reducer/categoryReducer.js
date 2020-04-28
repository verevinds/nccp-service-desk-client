import {
  CATEGORY_REQUEST_SENDD,
  CATEGORY_REQUEST_SUCCESSED,
} from '../constants';
const initialState = {
  list: [],
  isRequest: false,
  isLoading: true,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case CATEGORY_REQUEST_SUCCESSED:
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
