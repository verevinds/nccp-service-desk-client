import { CATALOG_REQUEST_SENDD, CATALOG_REQUEST_SUCCESSED, CATALOG_UPDATE } from '../constants';
import { DEPARTMENT_REQUEST_SUCCESSED } from '../constants';
const initialState = {
  list: [],
  isRequest: false,
  isLoading: false,
  isUpdate: false,
  department: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATALOG_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case CATALOG_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isRequest: false,
        isUpdate: false,
      };
    case DEPARTMENT_REQUEST_SUCCESSED:
      return {
        ...state,
        department: action.data,
      };
    case CATALOG_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
