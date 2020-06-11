import {
  INCIDENT_REQUEST_SENDD,
  INCIDENT_REQUEST_SUCCESSED,
  MY_INCIDENT_REQUEST_SUCCESSED,
  INCIDENT_CREATE,
  INCIDENT_CHOOSE,
  INCIDENT_HISTORY_REQUEST_SUCCESSED,
} from '../constants';

const initialState = {
  list: [],
  myList: [],
  history: [],
  current: {
    incident: undefined,
    isChange: false,
  },
  isRequest: false,
  isLoading: false,
  isUpdate: false,
};

export const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_REQUEST_SENDD:
      console.log(INCIDENT_REQUEST_SENDD);
      return {
        ...state,
        isLoading: false,
        isRequest: true,
      };
    case INCIDENT_REQUEST_SUCCESSED:
      console.log(INCIDENT_REQUEST_SUCCESSED);
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
        isRequest: false,
      };
    case MY_INCIDENT_REQUEST_SUCCESSED:
      console.log(MY_INCIDENT_REQUEST_SUCCESSED);
      return {
        ...state,
        myList: action.data,
        isLoading: true,
        isRequest: false,
        isUpdate: false,
      };

    case INCIDENT_HISTORY_REQUEST_SUCCESSED:
      console.log(INCIDENT_HISTORY_REQUEST_SUCCESSED);
      return {
        ...state,
        history: action.data,
        isLoading: true,
        isRequest: false,
        isUpdate: false,
      };
    case INCIDENT_CREATE:
      console.log(INCIDENT_CREATE);
      return {
        ...state,
        isUpdate: true,
      };
    case INCIDENT_CHOOSE:
      console.log(INCIDENT_CHOOSE);
      return {
        ...state,
        current: {
          ...state.current,
          incident: action.incident,
        },
      };
    default:
      return state;
  }
};
