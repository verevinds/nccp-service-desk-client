import {
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
  MY_INCIDENT_REQUEST_SUCCESSED,
  INCIDENT_CREATE,
} from '../constants';

const initialState = {
  list: [],
  myList: [],
  isRequest: false,
  isLoading: false,
  isUpdate: true,
};

export const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_REQUEST_SENDD:
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case INCIDENT_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
        isRequest: false,
      };
    case MY_INCIDENT_REQUEST_SUCCESSED:
      return {
        ...state,
        myList: action.data,
        isLoading: true,
        isRequest: false,
        isUpdate: false,
      };
    case INCIDENT_CREATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
