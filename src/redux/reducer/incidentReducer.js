import {
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
} from '../constants';

const initialState = {
  list: [],
  isRequest: false,
  isLoading: false,
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
        isRequest: false,
      };
    default:
      return state;
  }
};
